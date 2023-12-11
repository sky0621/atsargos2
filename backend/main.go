package main

import (
	"bytes"
	"context"
	"fmt"
	"image"
	"image/gif"
	"image/jpeg"
	"image/png"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"google.golang.org/api/iterator"

	"golang.org/x/image/draw"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" {
		log.Fatal("no PROJECT_ID")
	}

	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	authCli, err := app.Auth(ctx)
	if err != nil {
		log.Fatal(err)
	}
	firestoreCli, err := app.Firestore(ctx)
	if err != nil {
		log.Fatal(err)
	}
	storageCli, err := app.Storage(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(storageCli)

	var e *echo.Echo
	{
		e = echo.New()
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.CORS())
		e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(5)))

		e.GET("/*", static())
		g := e.Group("/api", createCustomMiddleware(authCli))
		g.GET("/list", list(firestoreCli, projectID))
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}

func createCustomMiddleware(authCli *auth.Client) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			idToken := c.Request().Header.Get("idToken")
			token, err := authCli.VerifyIDToken(c.Request().Context(), idToken)
			if err != nil {
				return err
			}
			if token == nil {
				return fmt.Errorf("token is nil")
			}
			fmt.Println(token)
			err = next(c)
			return err
		}
	}
}

func static() echo.HandlerFunc {
	return func(c echo.Context) error {
		wd, err := os.Getwd()
		if err != nil {
			log.Println(err)
			return err
		}
		fs := http.FileServer(http.Dir(filepath.Join(wd, "view")))
		fs.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

func list(firestoreCli *firestore.Client, projectID string) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := c.Request().Context()
		iter := firestoreCli.Collection("image").Documents(ctx)
		var images []*Image
		for {
			doc, err := iter.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				return err
			}
			var image *Image
			if err := doc.DataTo(&image); err != nil {
				fmt.Println(err)
				return c.String(http.StatusInternalServerError, err.Error())
			}
			if err != nil {
				fmt.Println(err)
				return c.String(http.StatusInternalServerError, err.Error())
			}
			image.URL = "https://firebasestorage.googleapis.com/v0/b/" + projectID + ".appspot.com/o/" + image.Name + "?alt=media"
			images = append(images, image)
		}
		return c.JSON(http.StatusOK, images)
	}
}

type Image struct {
	ID     string `json:"id"`
	Date   string `json:"date"`
	Name   string `json:"name"`
	Notify int    `json:"notify"`

	URL string `json:"url"`
}

func resizedImage(r io.Reader) (io.Reader, error) {
	imgSrc, imgType, err := image.Decode(r)
	if err != nil {
		return nil, err
	}

	rctSrc := imgSrc.Bounds()

	var imgDst *image.RGBA
	{
		dx := rctSrc.Dx()
		dy := rctSrc.Dy()
		for dx > 640 {
			dx = dx / 2
			dy = dy / 2
		}
		imgDst = image.NewRGBA(image.Rect(0, 0, dx, dy))
	}
	draw.CatmullRom.Scale(imgDst, imgDst.Bounds(), imgSrc, rctSrc, draw.Over, nil)

	bf := &bytes.Buffer{}
	switch imgType {
	case "png":
		if err := png.Encode(bf, imgDst); err != nil {
			return nil, err
		}
	case "jpeg":
		if err := jpeg.Encode(bf, imgDst, &jpeg.Options{Quality: 100}); err != nil {
			return nil, err
		}
	case "gif":
		if err := gif.Encode(bf, imgDst, nil); err != nil {
			return nil, err
		}
	default:
		return nil, err
	}

	return bf, nil
}
