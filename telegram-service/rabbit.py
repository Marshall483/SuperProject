import asyncio

from aio_pika import connect

from bot import on_message
from config import Config
from main import logger


async def consume() -> None:
    # Perform connection
    connection = await connect(Config.RABBITMQ_URI)
    async with connection:
        # Creating a channel
        channel = await connection.channel()

        exchanger = await channel.get_exchange(
            Config.EXCHANGE,
        )
        # Declaring queue
        queue = await channel.get_queue(Config.XLSX_QUEUE)

        await queue.bind(exchanger)
        # Start listening the queue
        await queue.consume(on_message, no_ack=True)

        logger.info('Starting messaging consume')
        await asyncio.Future()
