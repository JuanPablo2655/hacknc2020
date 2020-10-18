FROM rustlang/rust:nightly-buster-slim as builder

RUN mkdir /project
ADD . /project/
WORKDIR /project
RUN cargo build --release


FROM debian:buster-slim
EXPOSE 8000
COPY --from=builder /project/target/release/backend /app
CMD ["/app"]