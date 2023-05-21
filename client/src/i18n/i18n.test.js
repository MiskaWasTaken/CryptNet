import { getTranslations } from './';

import { test, expect } from 'vitest';

test('Get translation', () => {
  expect(getTranslations('en').welcomeHeader).toBe('Welcome to CryptNet alpha(build-1)');
  expect(getTranslations().welcomeHeader).toBe('Welcome to CryptNet alpha(build-1)');
  expect(getTranslations('fr').welcomeHeader).toBe('Bienvenue sur CryptNet alpha(build-1)');
  expect(getTranslations('zh-CN').welcomeHeader).toBe('欢迎来到CryptNet alpha(build-1)');
  expect(getTranslations('en-US').welcomeHeader).toBe('Welcome to CryptNet alpha(build-1)');
  expect(getTranslations('ru-CH').welcomeHeader).toBe('Добро пожаловать на CryptNet alpha(build-1)');
});
