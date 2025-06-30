package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Create a new Gin router with default middleware
	router := gin.Default()

	// 2. Define a simple GET endpoint at the root "/"
	router.GET("/", func(c *gin.Context) {
		// 3. Respond with a JSON message
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello from your Gin backend!",
		})
	})

	// 4. Run the server on port 8080
	router.Run(":8080")
}
