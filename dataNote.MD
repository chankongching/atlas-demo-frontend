
## Requirement (Jacky on wechat)

```
1133biLvFq3b9qSsHpAA9M15vhJYvw3iND
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF <= this is not correct
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF
huobi
okcoin
abraxas

the second record shld be "112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB"


1. 1133biLvFq3b9qSsHpAA9M15vhJYvw3iND
2. 112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB
3. 1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF
4. Huobi.com
5. OKCoin.com
6. AbraxasMarket

for dataset, description equal to category.

```

##  DataSet  190812

比特币转账的手续费一般为0.001~0.0015

|idx| owner | address                          | description    |NO of wallet |balance(BTC)    | sent  (BTC)|received (BTC) | totalfees(BTC)  | transfers | withdraws | deposits | addresses | risk_score_in | risk_score_out |
|---| ------| ---------------------------------| ---------------|---------|----------------|-------------|--------------|----------------|-----------|-----------|----------|-----------|---------------|----------------|
|1  | unknow | 1133biLvFq3b9qSsHpAA9M15vhJYvw3iND|Independent Wallet| 1  |0               | 4.65471200  | 4.65471200   | 0               | 14       |  274      | 381      |  56       |    92         |     87         |
|   |       |                                  |                | Jacky weChat| 链上数据| 链上数据     |链上数据        |发送和收入金额相等判断出手续费是其他地址的。|收和发的交易数|dummy| dummy    |交易相关的大概地址数，如果是这个含义；可以获得准确的个数。|dummy |dummy|
|2  |unknow |112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB|Exchange Wallet |1  |0              |102.57969972 |102.57969972 |   0              |2         |  345      | 465       |  21      | 81        |       84      |
|   |       |                                  |                 |Jacky weChat |链上数据| 链上数据     | 链上数据     |发送和收入金额相等判断出手续费是其他地址的。 |收和发的交易数|dummy | dummy |一起构建交易的地址数，没有排重。|dummy |dummy|
|3  |unknow|1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF|bitfinex-coldwallet|1 |79957.20036267|     0       |79957.20036267| 0              |294        |   3537    |    34234  |  364      | 85       |   93          |
|   |       |                                  |                 |Jacky weChat| 链上数据 |链上数据     | 链上数据       |只有接收没有发送                       |收和发的交易数|dummy |dummy |交易相关的大概地址数; 交易太多，这里是个大概值。可以获得准确的个数|dummy |dummy|
|4|huobi|Huobi.com|Exchange|696500| 426556.13143627 |2187264.00198514| 2613820.13342141|35.87638|48372618|46372819|87453267|65483|87|90|
| |     |         |        |Jacky on wechat|用tokenview的排行榜评估的|用tokenview的排行榜评估的|用tokenview的排行榜评估的|评估的| 评估的| dummy| dummy|dummy|dummy|dummy|
|5|okcoin|OKCoin.com|Exchange|159200|126556.13143627 |1473628.837267|1347072.70583073|20.356|2736892|33726172|69372816|37653|86|93|
| |      |          |        |Jacky on wechat|dummy|dummy|dummy|dummy|dummy|dummy|dummy|dummy|dummy|dummy|
|6|abraxas|AbraxasMarket|Darknet Market|149771|8473627.235465|14738926.8437367|6265299.6082717|17.345|2352345|543723|847369|3456|86|93|
|7|BTC-e.com|BTC-e.com|Exchange|307500|748392.675849|6758493.457463|7506886.133312|14.32423|36783|84732|3657|3456|85|97|
|8|Kraken.com|Kraken.com|Exchange||||||||||



## Insert into Mongodb

##  BTC-e.com

```
"_id" : ObjectId("5d41344ce8df60067efdb777"),
"address" : "AbraxasMarket",
"description" : "Darknet Market",
"no_of_wallets" : 307500,
"balance" : 748392.675849,
"sent" : 6758493.457463,
"received" : 7506886.133312,
"totalfees" : 14.32423,
"transfers" : 36783,
"withdraws" : 84732,
"deposits" : 3657,
"addresses" : 3456,
"risk_score_in" : 85,
"risk_score_out" : 97,

```


###  AbraxasMarket

```
"_id" : ObjectId("5d41344ce8df60067efdb666"),
"address" : "AbraxasMarket",
"description" : "Darknet Market",
"no_of_wallets" : 149771,
"balance" : 8473627.235465,
"sent" : 14738926.8437367,
"received" : 6265299.6082717,
"totalfees" : 17.345,
"transfers" : 2352345,
"withdraws" : 543723,
"deposits" : 847369,
"addresses" : 3456,
"risk_score_in" : 86,
"risk_score_out" : 93,

```

### okcoin
```
"_id" : ObjectId("5d41344ce8df60067efdb660"),
"address" : "OKCoin.com",
"description" : "Exchange",
"no_of_wallets" : 159200,
"balance" : 126556.13143627,
"sent" : 1473628.837267,
"received" : 1347072.70583073,
"totalfees" : 20.356,
"transfers" : 2736892,
"withdraws" : 33726172,
"deposits" : 33726172,
"addresses" : 37653,
"risk_score_in" : 86,
"risk_score_out" : 93,
```


### huobi

```
"_id" : ObjectId("5d41344ce8df60067efdb550"),
"address" : "Huobi.com",
"description" : "Exchange",
"no_of_wallets" : 696500,
"balance" : 426556.13143627,
"sent" : 2187264.00198514,
"received" : 2613820.13342141,
"totalfees" : 35.87638,
"transfers" : 48372618,
"withdraws" : 87453267,
"deposits" : 69372816,
"addresses" : 65483,
"risk_score_in" : 86,
"risk_score_out" : 93,
```



### 1133biLvFq3b9qSsHpAA9M15vhJYvw3iND   

```
"_id" : ObjectId("5d41344ce8df60067efdb550"),
"address" : "1133biLvFq3b9qSsHpAA9M15vhJYvw3iND",
"description" : "Independent Wallet",
"no_of_wallets" : "1",
"balance" : 0,
"sent" :   4.65471200,
"received" : 4.65471200,
"totalfees" : 0,
"transfers" : 14,
"withdraws" : 274,
"deposits" :  381,
"addresses" : 56,
"risk_score_in" :  92,
"risk_score_out" : 87,

```

### 112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB    

```
"_id" : ObjectId("5d41344ce8df60067efdb660"),
"address" : "112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB",
"description" : "Exchange Wallet",
"no_of_wallets" : "1",
"balance" : 0,
"sent" : 102.57969972,
"received" : 102.57969972,
"totalfees" :0,
"transfers" :2,
"withdraws" :345,
"deposits" :465,
"addresses" : 21,
"risk_score_in" : 81,
"risk_score_out" : 84,

```

### 1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF   

```
"_id" : ObjectId("5d41344ce8df60067efdb666"),
"address" : "1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF",
"description" : "bitfinex-coldwallet",
"no_of_wallets" : "1",
"balance" : 79957.20036267,
"sent" : 0,
"received" : 79957.20036267,
"totalfees" : 0,
"transfers" : 294,
"withdraws" : 3537,
"deposits" : 34234,
"addresses" : 364,
"risk_score_in" : 91,
"risk_score_out" : 79,

```
