package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"firebase.google.com/go/auth"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	authCli, err := app.Auth(ctx)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(authCli)

	var e *echo.Echo
	{
		e = echo.New()
		e.Pre(createCustomMiddleware(authCli))
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.CORS())
		e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(5)))

		e.GET("/*", test())
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}

func test() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, "test")
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
