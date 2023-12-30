package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/google/uuid"

	"google.golang.org/api/iterator"

	"cloud.google.com/go/firestore"
	"firebase.google.com/go/auth"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	fn := "main"

	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" {
		log.Fatal("no PROJECT_ID")
	}
	slog.Info("env", slog.String("PROJECT_ID", projectID), slog.String("func", fn))

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

	var e *echo.Echo
	{
		e = echo.New()
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.CORS())
		e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(5)))

		e.GET("/*", static())
		g := e.Group("/api", createCustomMiddleware(authCli))
		g.GET("/items", listItem(firestoreCli, projectID))
		g.POST("/items", addItem(firestoreCli))
		g.PUT("/items", updateItem(firestoreCli))
		g.DELETE("/items", deleteItem(firestoreCli))
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
			fn := "createCustomMiddleware"

			idToken := c.Request().Header.Get("id-token")
			token, err := authCli.VerifyIDToken(c.Request().Context(), idToken)
			if err != nil {
				slog.Error("failed to VerifyIDToken", slog.Any("error", err), slog.Any("token", token), slog.String("func", fn))
				return err
			}
			if token == nil {
				slog.Error("after VerifyIDToken: token is nil", slog.String("func", fn))
				return fmt.Errorf("token is nil")
			}
			slog.Info("after VerifyIDToken", slog.Any("token", token), slog.String("func", fn))

			err = next(c)
			return err
		}
	}
}

func static() echo.HandlerFunc {
	return func(c echo.Context) error {
		fn := "static"

		wd, err := os.Getwd()
		if err != nil {
			slog.Error("failed to os.Getwd", slog.Any("error", err), slog.String("func", fn))
			return err
		}
		slog.Info("after os.Getwd", slog.String("wd", wd), slog.String("func", fn))

		root := http.Dir(filepath.Join(wd, "view"))
		slog.Info("after http.Dir", slog.Any("root", root), slog.String("func", fn))

		fs := http.FileServer(root)
		fs.ServeHTTP(c.Response(), c.Request())
		return nil
	}
}

const mainCollectionName = "items"

func addItem(firestoreCli *firestore.Client) echo.HandlerFunc {
	return func(c echo.Context) error {
		fn := "addItem"

		r := AddItemRequest{}
		if err := c.Bind(&r); err != nil {
			slog.Error("failed to bind Request", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		slog.Info("got formValues", slog.Any("request", r), slog.String("func", fn))

		notify, err := strconv.Atoi(r.Notify)
		if err != nil {
			slog.Error("failed to strconv.Atoi", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		id := uuid.New().String()

		_, err = firestoreCli.Collection(mainCollectionName).Doc(id).Set(c.Request().Context(),
			map[string]interface{}{
				"id":     id,
				"date":   r.Date,
				"name":   r.Name,
				"notify": notify,
			},
		)
		if err != nil {
			slog.Error("failed to save to firestore", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusCreated, nil)
	}
}

func updateItem(firestoreCli *firestore.Client) echo.HandlerFunc {
	return func(c echo.Context) error {
		fn := "updateItem"

		r := UpdateItemRequest{}
		if err := c.Bind(&r); err != nil {
			slog.Error("failed to bind Request", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		slog.Info("got formValues", slog.Any("request", r), slog.String("func", fn))

		_, err := firestoreCli.Collection(mainCollectionName).Doc(r.ID).Update(c.Request().Context(),
			[]firestore.Update{
				{Path: "date", Value: r.Date},
				{Path: "name", Value: r.Name},
				{Path: "notify", Value: r.Notify},
			},
		)
		if err != nil {
			slog.Error("failed to update firestore", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusOK, nil)
	}
}

func deleteItem(firestoreCli *firestore.Client) echo.HandlerFunc {
	return func(c echo.Context) error {
		fn := "deleteItem"

		r := DeleteItemRequest{}
		if err := c.Bind(&r); err != nil {
			slog.Error("failed to bind Request", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		slog.Info("got formValues", slog.Any("request", r), slog.String("func", fn))

		_, err := firestoreCli.Collection("image").Doc(r.ID).Delete(c.Request().Context())
		if err != nil {
			slog.Error("failed to delete firestore", slog.Any("error", err), slog.String("func", fn))
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusNoContent, nil)
	}
}
func listItem(firestoreCli *firestore.Client, projectID string) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := c.Request().Context()
		iter := firestoreCli.Collection("items").Documents(ctx)
		var items []*Item
		for {
			doc, err := iter.Next()
			if errors.Is(err, iterator.Done) {
				break
			}
			if err != nil {
				return err
			}
			var item *Item
			if err := doc.DataTo(&item); err != nil {
				fmt.Println(err)
				return c.String(http.StatusInternalServerError, err.Error())
			}
			if err != nil {
				fmt.Println(err)
				return c.String(http.StatusInternalServerError, err.Error())
			}
			items = append(items, item)
		}
		return c.JSON(http.StatusOK, items)
	}
}

type Item struct {
	ID     string `json:"id"`
	Date   string `json:"date"`
	Name   string `json:"name"`
	Notify int    `json:"notify"`
}

type AddItemRequest struct {
	Name   string `json:"name"`
	Date   string `json:"date"`
	Notify string `json:"notify"`
}

type UpdateItemRequest struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Date   string `json:"date"`
	Notify int    `json:"notify"`
}

type DeleteItemRequest struct {
	ID string `json:"id"`
}
