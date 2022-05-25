import logging


class Logger:
    def __init__(self, logger_name, level, format, filepath):
        self._logger = logging.getLogger(logger_name)
        self._logger.setLevel(level)
        formatter = logging.Formatter(format)
        file_handler = logging.FileHandler(filepath)
        stream_handler = logging.StreamHandler()
        file_handler.setFormatter(formatter)
        stream_handler.setFormatter(formatter)
        self._logger.addHandler(file_handler)
        self._logger.addHandler(stream_handler)

    def debug(self, msg):
        self._logger.debug(msg)

    def info(self, msg):
        self._logger.info(msg)

    def warning(self, msg):
        self._logger.warning(msg)

    def error(self, msg):
        self._logger.error(msg)
