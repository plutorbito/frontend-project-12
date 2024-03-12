const resources = {
  ru: {
    translation: {
      login: {
        header: 'Войти',
        submitButton: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
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
        brand: 'Hexlet Chat',
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
        channelAdded: 'Канал создан',
        channelReamoved: 'Канал удалён',
        channelRenamed: 'Канал переименован',
        channelName: 'Имя канала',
        manageChannel: 'Управление каналом',
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
        getChannelsError: 'Ошибка загрузки каналов',
        getMessagesError: 'Ошибка загрузки сообщений',
      },
      newMessageForm: {
        formPlaceholder: 'Введите сообщение...',
        ariaLabel: 'Новое сообщение',
        sendMessageError: 'Ошибка отправки сообщения',
        send: 'Отправить',
        messageCount_zero: 'сообщений',
        messageCount_one: 'сообщение',
        messageCount_few: 'сообщения',
        messageCount_many: 'сообщений',
      },
      errors: {
        network: 'Ошибка соединения',
        unknown: 'Неизвестная ошибка',
        post: 'Ошибка отправки данных',
      },
    },
  },
};

export default resources;
