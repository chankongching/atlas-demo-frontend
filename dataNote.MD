
## Requirement (Jack on wechat)

```
1133biLvFq3b9qSsHpAA9M15vhJYvw3iND
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF <= this is not correct
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF
huobi
okcoin
abraxas

the second record shld be "112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB"

```

比特币转账的手续费一般为0.001~0.0015


|idx| owner | address                          | description    |balance(BTC)| sent  (BTC)|received (BTC) | totalfees(BTC)  | transfers | withdraws | deposits | addresses | risk_score_in | risk_score_out |
|---| ------| ---------------------------------| ---------------|-------     | --------   |----------     |---------  ------ |-----------| ----------|----------| ----------| --------------| ---------------|
|1  | huobi |1133biLvFq3b9qSsHpAA9M15vhJYvw3iND|huobi-coldwallet|0           | 4.65471200 |4.65471200     | 0.008            | 14        |  476      | 232      |  56       |    92         |     87         |
|   |       |                                  |                |  链上数据   | 链上数据     |链上数据        | 共7笔作为input的fee|收和发的交易数| dummy     | dummy    |交易相关的大概地址数，如果是这个含义；可以获得准确的个数。| dummy |dummy|
|2  |okcoin |112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB|okcoin-coldwallet|
|   |       |                                  |                 |
|3  |abraxas|1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF|abraxas-coldwallet|


### huobi         1133biLvFq3b9qSsHpAA9M15vhJYvw3iND

```
"_id" : ObjectId("5d41344ce8df60067efdb550"),
"address" : "1133biLvFq3b9qSsHpAA9M15vhJYvw3iND",
"description" : "huobi-coldwallet",
"no_of_wallets" : "1",
"balance" : 0,
"sent" :   4.65471200,
"received" : 4.65471200,
"totalfees" : 0.008,
"transfers" : 14,
"withdraws" : NumberLong(476),
"deposits" : NumberLong(232),
"addresses" : 56,
"risk_score_in" :  92,
"risk_score_out" : 87,

```
