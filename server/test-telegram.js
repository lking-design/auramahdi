const { sendTestMessage } = require('./services/telegram');

async function testTelegram() {
  try {
    await sendTestMessage();
    console.log('✅ Telegram bot is working!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Telegram bot error:', error.message);
    console.log('\n📝 Make sure you have:');
    console.log('1. Created a bot with @BotFather');
    console.log('2. Got your bot token');
    console.log('3. Got your chat ID (using @userinfobot)');
    console.log('4. Added both to .env.local:');
    console.log('   TELEGRAM_BOT_TOKEN=your_token_here');
    console.log('   TELEGRAM_CHAT_ID=your_chat_id_here');
    process.exit(1);
  }
}

testTelegram();




async function testTelegram() {
  try {
    await sendTestMessage();
    console.log('✅ Telegram bot is working!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Telegram bot error:', error.message);
    console.log('\n📝 Make sure you have:');
    console.log('1. Created a bot with @BotFather');
    console.log('2. Got your bot token');
    console.log('3. Got your chat ID (using @userinfobot)');
    console.log('4. Added both to .env.local:');
    console.log('   TELEGRAM_BOT_TOKEN=your_token_here');
    console.log('   TELEGRAM_CHAT_ID=your_chat_id_here');
    process.exit(1);
  }
}

testTelegram();



