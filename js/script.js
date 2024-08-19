function calculateRandomOutcome(probability) {
	const randomValue = Math.floor(Math.random() * 1000);
	return randomValue < probability;
}

document.getElementById('simulateButton').addEventListener('click', function() {
	// 記錄開始時間
	const startTime = new Date();

	// 取得表單的數據
	const poolType = document.querySelector('input[name="poolType"]:checked')?.value || '未選擇';
	const drawType = document.querySelector('input[name="drawType"]:checked')?.value || '未選擇';
	const currentPulls = parseInt(document.getElementById('currentPulls').value) || 0;
	const targetFiveStars = parseInt(document.getElementById('targetFiveStars').value) || 1;
	const simTimes = parseInt(document.getElementById('simTimes').value) || 1000000;
	const fullConstellation = document.getElementById('fullConstellation').checked ? true : false;


	let cluster = new StatisticsCluster();
	if (drawType == "character") {

		switch (poolType) {
			case "yuan":
				for (let i = 0; i < simTimes; i++) {
					let pullsTimes = currentPulls + 1;
					let totalPull = 0;
					let hardPity = document.getElementById('hardPity').checked ? true : false;
					for (let fiveStars = 0; fiveStars < targetFiveStars;) {
						totalPull = totalPull + 1;
						let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						for (; !calculateRandomOutcome(random);) {
							pullsTimes = pullsTimes + 1;
							totalPull = totalPull + 1;
							random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						}
						if (hardPity) {
							fiveStars = fiveStars + 1;
							hardPity = false;
						} else {
							if (calculateRandomOutcome(500)) {
								fiveStars = fiveStars + 1;
							} else {
								if (calculateRandomOutcome(100))
									fiveStars = fiveStars + 1;
								else
									hardPity = true;
							}
						}
						pullsTimes = 1;
					}

					cluster.add(totalPull);
					totalPull = 0;
					pullsTimes = currentPulls + 1;
					hardPity = document.getElementById('hardPity').checked ? true : false;
				}
				break;
			case "tie":
				for (let i = 0; i < simTimes; i++) {
					let pullsTimes = currentPulls + 1;
					let totalPull = 0;
					let hardPity = document.getElementById('hardPity').checked ? true : false;
					for (let fiveStars = 0; fiveStars < targetFiveStars;) {
						totalPull = totalPull + 1;
						let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						for (; !calculateRandomOutcome(random);) {
							pullsTimes = pullsTimes + 1;
							totalPull = totalPull + 1;
							random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						}
						if (hardPity) {
							fiveStars = fiveStars + 1;
							hardPity = false;
						} else {
							if (calculateRandomOutcome(500)) {
								fiveStars = fiveStars + 1;
							} else {
								if (calculateRandomOutcome(143))
									fiveStars = fiveStars + 1;
								else
									hardPity = true;
							}
						}

						pullsTimes = 1;
					}

					cluster.add(totalPull);
					totalPull = 0;
					pullsTimes = currentPulls + 1;
					hardPity = document.getElementById('hardPity').checked ? true : false;
				}
				break;
			case "jue":
				for (let i = 0; i < simTimes; i++) {
					let pullsTimes = currentPulls + 1;
					let totalPull = 0;
					let hardPity = document.getElementById('hardPity').checked ? true : false;
					for (let fiveStars = 0; fiveStars < targetFiveStars;) {
						totalPull = totalPull + 1;
						let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						for (; !calculateRandomOutcome(random);) {
							pullsTimes = pullsTimes + 1;
							totalPull = totalPull + 1;
							random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
						}
						if (hardPity) {
							fiveStars = fiveStars + 1;
							hardPity = false;
						} else {
							if (calculateRandomOutcome(500)) {
								fiveStars = fiveStars + 1;
							} else {
								hardPity = true;
							}
						}

						pullsTimes = 1;
					}

					cluster.add(totalPull);
					totalPull = 0;
					pullsTimes = currentPulls + 1;
					hardPity = document.getElementById('hardPity').checked ? true : false;
				}
				break;
			default:
				break;
		}
	}
	else if (drawType == "weapon") {
		switch (poolType) {
			case "yuan":
				for (let i = 0; i < simTimes; i++) {
					let pullsTimes = currentPulls + 1;
					let totalPull = 0;
					let hardPity = document.getElementById('hardPity').checked ? true : false;
					for (let fiveStars = 0; fiveStars < targetFiveStars;) {
						totalPull = totalPull + 1;
						let random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777);
						for (; !calculateRandomOutcome(random);) {
							pullsTimes = pullsTimes + 1;
							totalPull = totalPull + 1
							random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777)
						}
						if (hardPity) {
							fiveStars = fiveStars + 1;
							hardPity = false;
						} else {
							if (calculateRandomOutcome(250)) {
								hardPity = true;
							} else {
								if (calculateRandomOutcome(500))
									fiveStars = fiveStars + 1;
								else
									hardPity = true;
							}
						}
						pullsTimes = 1;
					}

					cluster.add(totalPull);
					totalPull = 0;
					pullsTimes = currentPulls + 1;
					hardPity = document.getElementById('hardPity').checked ? true : false;
				}
				break;
			case "tie":
			case "jue":
				for (let i = 0; i < simTimes; i++) {
					let pullsTimes = currentPulls + 1;
					let totalPull = 0;
					let hardPity = document.getElementById('hardPity').checked ? true : false;
					for (let fiveStars = 0; fiveStars < targetFiveStars;) {
						totalPull = totalPull + 1;
						let random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777);
						for (; !calculateRandomOutcome(random);) {
							pullsTimes = pullsTimes + 1;
							totalPull = totalPull + 1
							random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777)
						}
						if (hardPity) {
							fiveStars = fiveStars + 1;
							hardPity = false;
						} else {
							if (calculateRandomOutcome(250)) {
								hardPity = true;
							} else {
								fiveStars = fiveStars + 1;
							}
						}
						pullsTimes = 1;
					}

					cluster.add(totalPull);
					totalPull = 0;
					pullsTimes = currentPulls + 1;
					hardPity = document.getElementById('hardPity').checked ? true : false;
				}
				break;
			default:
				break;
		}
	}

	const average = cluster.getAverage();
	const min = cluster.getMin();
	const max = cluster.getMax();
	const median = cluster.getMedian();

	// 記錄結束時間
	const endTime = new Date();

	// 計算運行時間（以毫秒為單位）
	const elapsedTime = endTime - startTime;

	// 構建結果字符串
	const resultText = `
期望值: ${average}
最小值: ${min}
最大值: ${max}
中位數: ${median}
運行時間: ${elapsedTime} 毫秒
    `;

	// 顯示結果到textarea
	document.getElementById('result').value = resultText.trim();
});

class StatisticsCluster {
	constructor() {
		this.data = [];
		this.min = Infinity;
		this.max = -Infinity;
		this.sum = 0;
		this.avg = 0;
	}

	// 添加整數到群集中
	add(value) {
		if (Number.isInteger(value)) {
			if (value < this.min) this.min = value;
			if (value > this.max) this.max = value;

			this.sum += value;
			this.data.push(value);
			this.avg = this.sum / this.data.length;
		} else {
			throw new Error("Value must be an integer.");
		}
	}

	// 計算平均值
	getAverage() {
		return this.avg;
	}

	// 獲取最小值
	getMin() {
		return this.min;
	}

	// 獲取最大值
	getMax() {
		return this.max;
	}

	getMedian() {
		if (this.data.length === 0) return null;

		// 排序數據以計算中位數
		const sortedData = [...this.data].sort((a, b) => a - b);
		const midIndex = Math.floor(sortedData.length / 2);

		// 如果數據長度為奇數，則返回中間值，否則返回中間兩個值的平均數
		return sortedData.length % 2 !== 0
			? sortedData[midIndex]
			: (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
	}
}
