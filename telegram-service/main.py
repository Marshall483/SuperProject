import asyncio
import os

from aio_pika import connect
from aio_pika.abc import AbstractIncomingMessage
from aiogram import Bot, Dispatcher, types
from aiogram.utils import executor

TOKEN = os.getenv('TG_BOT_TOKEN')
bot = Bot(TOKEN)
dp = Dispatcher(bot)


@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    # logging.info(message.as_json())
    # async with create_async_session() as async_session:
    # await services.save_account(async_session, message.from_user, message.chat.id)
    print(message.chat.id)
    await message.reply(
        f"Добрый день, {message.from_user.full_name}.\n\n "
        f"Для того чтобы посмотреть команды, отправьте /help."
    )


async def on_message(message: AbstractIncomingMessage) -> None:
    """
    on_message doesn't necessarily have to be defined as async.
    Here it is to show that it's possible.
    """
    print(" [x] Received message %r" % message)
    print("Message body is: %r" % message.body)
    await bot.send_message(776204677, "test")
    print("Before sleep!")
    await asyncio.sleep(5)  # Represents async I/O operations
    print("After sleep!")


async def main() -> None:
    # Perform connection
    connection = await connect("amqp://guest:guest@localhost/")
    async with connection:
        # Creating a channel
        channel = await connection.channel()

        # Declaring queue
        queue = await channel.declare_queue("hello")

        # Start listening the queue with name 'hello'
        await queue.consume(on_message, no_ack=True)

        print(" [*] Waiting for messages. To exit press CTRL+C")
        await asyncio.Future()


async def on_startup(_):
    asyncio.create_task(main())

if __name__ == "__main__":
    executor.start_polling(dp, skip_updates=True, on_startup=on_startup)
