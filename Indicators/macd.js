registerIndicator(
    "macd", "MACD(v1.01)", function (context) {
        var dataInput = getDataInput(context, 0)
		var dataFEMA = getDataOutput(context, "fastEMA")
		var dataSEMA = getDataOutput(context, "slowEMA")
		var dataOutputMain = getDataOutput(context, "main")
		var dataOutputSignal = getDataOutput(context, "signal")

		var fEMA = getIndiParameter(context, "fastEMA")
		var sEMA = getIndiParameter(context, "slowEMA")
		var sgnlSMA = getIndiParameter(context, "signalSMA")

		var calculatedLength = getCalculatedLength(context)
		var i = calculatedLength

		if (i == 0) {
			dataFEMA[0] = dataInput[0]
			dataSEMA[0] = dataInput[0]
			dataOutputMain[0] = 0
			i++
		} else if (i == 1) {
		} else {
			i--
		}

		ema(dataInput, dataFEMA, calculatedLength, fEMA)
		ema(dataInput, dataSEMA, calculatedLength, sEMA)

		while (i < dataInput.length) {
			dataOutputMain[i] = dataFEMA[i] - dataSEMA[i]
			i++
		}

		sma(dataOutputMain, dataOutputSignal, calculatedLength, sgnlSMA)
	},[{
		name: "fastEMA",
		value: 12,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "slowEMA",
		value: 26,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "signalSMA",
		value: 9,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "fastEMA",
		visible: false
	},{
		name: "slowEMA",
		visible: false
	},{
        name: "main",
        visible: true,
        renderType: RENDER_TYPE.HISTOGRAM,
        color: "#4EC2B4"
    },{
        name: "signal",
        visible: true,
        renderType: RENDER_TYPE.LINE,
        color: "#CCCCCC"
    }],
	WHERE_TO_RENDER.SEPARATE_WINDOW)
