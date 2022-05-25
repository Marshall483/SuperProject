import base64
import io
import json

from aio_pika.abc import AbstractIncomingMessage
from aiogram import types
from aiogram.types import InputFile

from config import Config
from main import dp, bot, logger


@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    await message.reply(
        f"Добрый день, {message.from_user.full_name}.\n\n "
        f"Для того чтобы посмотреть команды, отправьте /help."
    )


async def on_message(message: AbstractIncomingMessage) -> None:
    """
    send xlsx report
    """
    data = json.loads(message.body)
    document = base64.b64decode(data['documentContent'])
    xlsx_file = io.BytesIO(document)
    await bot.send_document(chat_id=Config.CHAT_ID,
                            document=InputFile(xlsx_file, f"{data['documentName']}.xlsx"),
                            caption=f"Report-{data['id']}")
    logger.info(f'Report with id - {data["id"]} was send')
