import os


class Config:
    TG_TOKEN = os.getenv('TG_TOKEN', '5366184763:AAGhYk2zsnVjso6iYaWZV5mOJzfy_Z0-HZ8')
    EXCHANGE = os.getenv('EXCHANGE', 'EXCHANGER')
    XLSX_QUEUE = os.getenv('XLSX_QUEUE', 'XLSX_QUEUE')
    CHAT_ID = os.getenv('CHAT_ID', '-782916940')

    RABBITMQ_HOST = os.getenv('SPRING_RABBITMQ_HOST', 'localhost')
    RABBITMQ_USERNAME = os.getenv('SPRING_RABBITMQ_USERNAME', 'guest')
    RABBITMQ_PASSWORD = os.getenv('SPRING_RABBITMQ_PASSWORD', 'guest')

    RABBITMQ_URI = f'amqp://{RABBITMQ_USERNAME}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}/'

    LOGGING_LEVEL = os.getenv('LOGGING_LEVEL', 'INFO')
