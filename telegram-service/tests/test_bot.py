from unittest.mock import AsyncMock

import pytest

from bot import send_welcome, on_message


@pytest.mark.asyncio
async def test_send_welcome():
    text_mock = 'test'
    message_mock = AsyncMock(full_name=text_mock)
    message_mock = AsyncMock(from_user=message_mock)
    await send_welcome(message=message_mock)

    assert message_mock.reply


@pytest.mark.asyncio
async def test_on_message():
    text_mock = b'{"documentContent": "test", "documentName": "test", "id": "test"}'

    message_mock = AsyncMock(body=text_mock)
    await on_message(message=message_mock)

    assert message_mock.body
