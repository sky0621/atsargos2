FROM golang:1.21 AS builder
WORKDIR /app
COPY backend/* ./
RUN go mod download && go build -o main /app/main.go

FROM gcr.io/distroless/static-debian12
WORKDIR /app
COPY --from=builder /app/main .
USER 1001
CMD [ "/app/main" ]