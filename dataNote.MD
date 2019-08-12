
## Requirement (Jacky on wechat)

```
1133biLvFq3b9qSsHpAA9M15vhJYvw3iND
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF <= this is not correct
1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF
huobi
okcoin
abraxas

the second record shld be "112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB"

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
|4|huobi|Huobi.com|Exchange|696500||||||||||
|5|okcoin|OKCoin.com|Exchange|159200||||||||||
|6|abraxas|AbraxasMarket|Darknet Market|149771||||||||||



1. 1133biLvFq3b9qSsHpAA9M15vhJYvw3iND
2. 112xfbAbdKfyEnwZEv13JU6ibEHpJqZ3rB
3. 1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF
4. Huobi.com
5. OKCoin.com
6. AbraxasMarket

for dataset, description equal to category


## Insert into Mongodb

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
