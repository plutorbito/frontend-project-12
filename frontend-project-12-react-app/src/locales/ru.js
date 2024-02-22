const resources = {
  ru: {
    translation: {
      login: {
        header: 'Войти',
        submitButton: 'Войти',
        username: 'Ваш ник',
        password: 'Ваш пароль',
        signup: 'Регистрация',
        noAccount: 'Нет аккаунта?',
        validation: {
          authFailed: 'Неверные имя пользователя или пароль',
        },
      },
      signup: {
        header: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submitButton: 'Зарегистрироваться',
        validation: {
          userExists: 'Такой пользователь уже существует',
          required: 'Обязательное поле',
          userNameLength: 'От 3 до 20 символов',
          passwordLength: 'Не менее 6 символов',
          passwordsMatch: 'Пароли должны совпадать',
        },
      },
      navbar: {
        logout: 'Выйти',
        brand: 'Chat',
      },
      channelModals: {
        addChannelHeader: 'Добавить канал',
        renameChannelHeader: 'Переименовать канал',
        removeChannelHeader: 'Удалить',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
        deleteButton: 'Удалить',
        renameDropdown: 'Переименовать',
        deleteDropdown: 'Удалить',
        removeChannelBody: 'Уверены?',
        validation: {
          required: 'Обязательное поле',
          channelLength: 'От 3 до 20 символов',
          channelExists: 'Должно быть уникальным',
        },
      },
      channelsBox: {
        channels: 'Каналы',
      },
      chatPage: {
        loading: 'Загрузка...',
      },
      newMessageForm: {
        formPlaceholder: 'Введите сообщение...',
        sendMessageError: 'Ошибка отправки сообщения',
        send: 'Отправить',
        messageCount_zero: 'сообщений',
        messageCount_one: 'сообщение',
        messageCount_few: 'сообщения',
        messageCount_many: 'сообщений',
      },
    },
  },
};

export default resources;
