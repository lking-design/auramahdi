# 📱 Telegram Bot Setup Guide

This guide will help you set up Telegram notifications for new orders.

## Step 1: Create a Telegram Bot

1. **Open Telegram** and search for **@BotFather**
2. Start a chat with BotFather by clicking **Start**
3. Send the command: `/newbot`
4. BotFather will ask for a name - enter something like: `ParfumeX Order Bot`
5. BotFather will ask for a username - enter something like: `parfumex_order_bot` (must end with `bot`)
6. BotFather will give you a **Bot Token** - copy it! It looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

## Step 2: Get Your Chat ID

You need to find your Telegram Chat ID (your personal chat ID where you want to receive notifications).

### Method 1: Using @userinfobot (Easiest)

1. Search for **@userinfobot** in Telegram
2. Start a chat and click **Start**
3. The bot will send you your Chat ID (a number like `123456789`)
4. Copy this number

### Method 2: Using @getidsbot

1. Search for **@getidsbot** in Telegram
2. Start a chat and click **Start**
3. Send any message to the bot
4. The bot will reply with your Chat ID
5. Copy this number

### Method 3: Manual Method

1. Send a message to your bot (the one you created in Step 1)
2. Open this URL in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id":123456789}` in the response
4. Copy the number after `"id":`

## Step 3: Update .env.local File

Open your `.env.local` file and add these two lines:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Example:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=parfumex
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Step 4: Test the Bot

1. Make sure your backend server is running: `npm run server`
2. Test the bot by sending a POST request to:
   ```
   http://localhost:3001/api/telegram/test
   ```
   
   Or use curl:
   ```bash
   curl -X POST http://localhost:3001/api/telegram/test
   ```

3. You should receive a test message in Telegram: "✅ Telegram bot is working! You will receive notifications for new orders."

## Step 5: Test with a Real Order

1. Go to your website: http://localhost:3000
2. Add items to cart
3. Complete checkout
4. You should receive a notification in Telegram with order details!

## What You'll Receive

When someone places an order, you'll get a Telegram message with:
- 📦 Order number
- 👤 Customer information (name, phone, address)
- 🛍️ List of items ordered
- 💵 Total amount
- 💳 Payment method
- 📊 Order status

## Troubleshooting

### "Telegram bot not configured"
- Make sure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are in `.env.local`
- Restart your backend server after updating `.env.local`

### "Unauthorized" or "Invalid token"
- Check that your bot token is correct (no extra spaces)
- Make sure you copied the full token from BotFather

### "Chat not found"
- Make sure you sent at least one message to your bot first
- Verify your Chat ID is correct
- Try getting your Chat ID again using one of the methods above

### No notifications received
- Check server console for error messages
- Make sure the backend server is running
- Test the bot using the test endpoint first

## Security Notes

- Never share your bot token publicly
- Never commit `.env.local` to version control
- Keep your bot token secure

## Need Help?

If you're having trouble:
1. Check the server console for error messages
2. Verify your bot token and chat ID are correct
3. Make sure you sent a message to your bot first (to initialize the chat)
4. Try the test endpoint to verify the setup






This guide will help you set up Telegram notifications for new orders.

## Step 1: Create a Telegram Bot

1. **Open Telegram** and search for **@BotFather**
2. Start a chat with BotFather by clicking **Start**
3. Send the command: `/newbot`
4. BotFather will ask for a name - enter something like: `ParfumeX Order Bot`
5. BotFather will ask for a username - enter something like: `parfumex_order_bot` (must end with `bot`)
6. BotFather will give you a **Bot Token** - copy it! It looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

## Step 2: Get Your Chat ID

You need to find your Telegram Chat ID (your personal chat ID where you want to receive notifications).

### Method 1: Using @userinfobot (Easiest)

1. Search for **@userinfobot** in Telegram
2. Start a chat and click **Start**
3. The bot will send you your Chat ID (a number like `123456789`)
4. Copy this number

### Method 2: Using @getidsbot

1. Search for **@getidsbot** in Telegram
2. Start a chat and click **Start**
3. Send any message to the bot
4. The bot will reply with your Chat ID
5. Copy this number

### Method 3: Manual Method

1. Send a message to your bot (the one you created in Step 1)
2. Open this URL in your browser (replace `YOUR_BOT_TOKEN` with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id":123456789}` in the response
4. Copy the number after `"id":`

## Step 3: Update .env.local File

Open your `.env.local` file and add these two lines:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Example:**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=parfumex
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Step 4: Test the Bot

1. Make sure your backend server is running: `npm run server`
2. Test the bot by sending a POST request to:
   ```
   http://localhost:3001/api/telegram/test
   ```
   
   Or use curl:
   ```bash
   curl -X POST http://localhost:3001/api/telegram/test
   ```

3. You should receive a test message in Telegram: "✅ Telegram bot is working! You will receive notifications for new orders."

## Step 5: Test with a Real Order

1. Go to your website: http://localhost:3000
2. Add items to cart
3. Complete checkout
4. You should receive a notification in Telegram with order details!

## What You'll Receive

When someone places an order, you'll get a Telegram message with:
- 📦 Order number
- 👤 Customer information (name, phone, address)
- 🛍️ List of items ordered
- 💵 Total amount
- 💳 Payment method
- 📊 Order status

## Troubleshooting

### "Telegram bot not configured"
- Make sure `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are in `.env.local`
- Restart your backend server after updating `.env.local`

### "Unauthorized" or "Invalid token"
- Check that your bot token is correct (no extra spaces)
- Make sure you copied the full token from BotFather

### "Chat not found"
- Make sure you sent at least one message to your bot first
- Verify your Chat ID is correct
- Try getting your Chat ID again using one of the methods above

### No notifications received
- Check server console for error messages
- Make sure the backend server is running
- Test the bot using the test endpoint first

## Security Notes

- Never share your bot token publicly
- Never commit `.env.local` to version control
- Keep your bot token secure

## Need Help?

If you're having trouble:
1. Check the server console for error messages
2. Verify your bot token and chat ID are correct
3. Make sure you sent a message to your bot first (to initialize the chat)
4. Try the test endpoint to verify the setup





