# 🚀 Quick Telegram Bot Setup (5 minutes)

## Step 1: Create Bot (2 minutes)

1. Open Telegram app
2. Search for **@BotFather**
3. Send: `/newbot`
4. Enter bot name: `ParfumeX Orders`
5. Enter username: `parfumex_orders_bot` (must end with `bot`)
6. **Copy the token** (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Get Your Chat ID (1 minute)

1. Search for **@userinfobot** in Telegram
2. Click **Start**
3. **Copy your Chat ID** (a number like `123456789`)

## Step 3: Update .env.local (1 minute)

Open `.env.local` and add:

```env
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Example:**
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Step 4: Test It (1 minute)

1. Restart your backend server (stop and run `npm run server` again)
2. Run: `npm run test-telegram`
3. You should receive a message in Telegram! ✅

## Done! 🎉

Now every time someone places an order, you'll get a Telegram notification!



