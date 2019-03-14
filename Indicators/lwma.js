registerIndicator(
    "lwma", "Linear weighted moving average", function (context) {
		var dataInput = getDataInput(context, 0)
		var dataOutput = getDataOutput(context, "lwma")
		var period = getIndiParameter(context, "period")

		var calculatedLength = getCalculatedLength(context)

		lwma(dataInput, dataOutput, calculatedLength, period)

		if (shift != null) {
			setShift(dataOutput, shift)
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
		name: "lwma",
		visible: true,
		renderType: RENDER_TYPE.LINE,
		color: "steelblue"
	}],
	WHERE_TO_RENDER.CHART_WINDOW)