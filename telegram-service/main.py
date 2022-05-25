import asyncio

from aiogram import Bot, Dispatcher
from aiogram.utils import executor

from config import Config
from logger import Logger

bot = Bot(Config.TG_TOKEN)
dp = Dispatcher(bot)

logger = Logger(
    logger_name='sm-users-service',
    level=Config.LOGGING_LEVEL,
    format='%(asctime)s %(levelname)s: %(message)s',
    filepath='logs/telegram_service.log'
)


async def on_startup(_):
    await asyncio.create_task(consume())


if __name__ == "__main__":
    from rabbit import consume

    executor.start_polling(dp, skip_updates=True, on_startup=on_startup)
