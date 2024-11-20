---
title: How to use Party Bots
---

# Getting Started

Party Bots is in its infancy, but using it is very simple.

First, navigate to the home page and download the executable for your system (Windows or Unix). You'll get a zip folder that contains two items: PartyBots.exe and config.json. Unzip the directory and place it somewhere you won't forget.

## Config.json

The config.json file is where you configure Party Bots to suit your needs. Everything required to run Party Bots is contained in this file. Below is a breakdown of each property:

```json
{
    "user_id": "",
    "license_key": "",
    "demo_mode": true,
    "connection_string": "sqlite:///trading_bot.db",
    "minimum_trust_fund_balance": 0.00,
    "amount_of_AUD_to_invest": 100.0,
    "the_percent_gain_to_sell_at": 4.0,
    "the_percent_loss_to_sell_at": 50.0,
    "asset_codes": [
        "ETH",
        "BTC",
        "XRP",
        "LTC"
    ],
    "max_bots_for_given_currency": 2,
    "exchange_secrets": {
        "swyftx": {
            "SWYFTX_APIKEY": "",
            "SWYFTX_JWT": ""
        }
    }
}
```

Here is an explanation for each property:

`user_id`: Your unique user identifier. This is provided after registration or purchase.

`license_key`: The key that verifies your license to use Party Bots. You will receive this after purchasing the app.

`demo_mode`: Set to true to use demo mode, which does not require real funds. Set to false for live trading.

`connection_string`: The database connection string, which points to the SQLite database used by Party Bots to store trading information.

`minimum_trust_fund_balance`: The minimum balance required in your trading account to start investing. Set to 0.00 to ignore this requirement.

`amount_of_AUD_to_invest`: The amount (in AUD) that each bot will use for investments.

`the_percent_gain_to_sell_at`: The percentage gain at which the bot will sell to take profits. For example, 4.0 means sell when the value increases by 4%.

`the_percent_loss_to_sell_at`: The percentage loss at which the bot will sell to minimize losses. For example, 50.0 means sell when the value drops by 50%.

`asset_codes`: A list of asset codes (e.g., cryptocurrencies) you want the bots to trade. Examples include ETH, BTC, XRP, LTC. 
- ℹ️ For a full List of cryptocurrency symbols, please visit: [Swyftx.com.au](https://swyftx.com/au/buy/)

`max_bots_for_given_currency`: The maximum number of bots that can run concurrently for each specified currency.

`exchange_secrets`: Contains your API credentials for accessing the exchange.

`swyftx`: Credentials for the swyftx.com.au crypto exchange.

`SWYFTX_APIKEY`: Your API key for Swyftx.

`SWYFTX_JWT`: Your JWT token for Swyftx.

Currently, Party Bots only works with the Swyftx crypto exchange, which is available in Australia. If there is significant interest in expanding support, I will implement integrations for other exchanges.

To use Party Bots, you will need to:
-  create a Swyftx account 
-  generate an API key and JWT secret

To do this, navigate to your account settings, select api key, and create one with trading permissions.

Note: It is not necessary to deposit funds when running in demo mode.





## PartyBots.exe

Once you've configured config.json, simply double-click PartyBots.exe to start running the application.

The program will read your config.json and initially run in demo mode if specified. In demo mode, it will create bots for each of your selected currencies, making initial purchases with stop-loss and take-profit orders that execute automatically based on your settings.

It is recommended to run the app 24/7 for optimal results. However, it is safe to stop and restart the app at any time. Stop-loss and take-profit orders are executed by the exchange itself, so if you stop the app, it will still sell at the profit or loss margins specified in the config. The only downside to stopping the app is that it won't make new purchases until you turn it back on.

While in demo mode, you can reset your demo Party Bot instance at any time by running the following command in a terminal:

```
./PartyBots.exe --reset
```

## Observability

Currently, Party Bots is minimal in terms of observability, but we provide a script to compile statistics from your database. The database, trading_bot.db, is located next to PartyBots.exe in the same directory. You can use any database viewing tool compatible with SQLite to inspect your trading history and bot performance.



| Future Plans: If there is significant interest and users are willing to purchase the app, I plan to develop a user-friendly graphical interface (UI) that will make monitoring and managing your bots much easier.