"use client";
import { NextIntlClientProvider } from "next-intl";

export default function IntlClientWrapper({ messages, locale, children }: { messages: any, locale: string, children: React.ReactNode }) {
  return <NextIntlClientProvider messages={messages} locale={locale}>{children}</NextIntlClientProvider>;
} 