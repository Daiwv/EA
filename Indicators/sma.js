registerIndicator(
	"sma", "Simple moving average(v1.0)", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "sma")
		var period = getIndiParameter(context, "period")
		var shift = getIndiParameter(context, "shift")

		var calculatedLength = getCalculatedLength(context)

		sma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null && calculatedLength == 0) {
			setIndiShift(context, "sma", shift)
		}
	},[{
		name: "period",
		value: 5,
		required: true,
		type: PARAMETER_TYPE.INTEGER,
		range: [1, 100]
	},{
		name: "shift",
		value: 0,
		required: false,
		type: PARAMETER_TYPE.INTEGER,
		range: [-30, 30]
	}],
	[{
		name: DATA_NAME.CLOSE,
		index: 0
	}],
	[{
		name: "sma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)
