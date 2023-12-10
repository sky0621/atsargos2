package main

import (
	"context"
	firebase "firebase.google.com/go"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
	"os"
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
	user, err := authCli.GetUser(ctx, "BYk3T97IzjgZz3xCrKK2ax4M11F3")
	if err != nil {
		log.Fatal(err)
	}
	log.Println(user.Email)

	var e *echo.Echo
	{
		e = echo.New()
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.CORS())

		e.GET("/*", test(user.Email))
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}

func test(mail string) echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, mail)
	}
}
