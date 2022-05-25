FROM python:3.10.2-slim as builder

WORKDIR /app

COPY . /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Финальный этап
FROM python:3.10.2-slim

WORKDIR /app

COPY --from=build /app/. .

RUN mkdir -p ./logs
RUN pip install --no-cache /wheels/*

RUN python main.py