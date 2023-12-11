FROM golang:1.21 AS builder
WORKDIR /app
COPY backend/* ./
COPY backend/view ./view
RUN go mod download && go build -o main /app/main.go

FROM gcr.io/distroless/base-debian12
WORKDIR /app
COPY --from=builder /app/main .
COPY --from=builder /app/view ./view
USER 1001
CMD [ "/app/main" ]
