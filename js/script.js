function calculateRandomOutcome(probability) {
	const randomValue = Math.floor(Math.random() * 1000);
	return randomValue < probability;
}

document.getElementById("simulateButton").addEventListener("click", async function() {
	gtag("event", "simulate", {
	  poolType: document.querySelector('input[name="poolType"]:checked')?.value,
	  targetFiveStars: parseInt(document.getElementById('targetFiveStars').value) || 0,
	  targetFiveStars_weapon:parseInt(document.getElementById('targetFiveStars_weapon').value) || 0
	});
	document.getElementById("loadingOverlay").style.display = "flex";

	try {
		// 以非同步方式執行 simulateGacha 並等待其完成
		await simulateGacha();
	} finally {
		// 計算完成後隱藏 overlay
		document.getElementById("loadingOverlay").style.display = "none";
	}

});

async function simulateGacha() {

	return new Promise((resolve) => {
		if (parseInt(document.getElementById('currentPulls').value) < 0)
			document.getElementById('currentPulls').value = 0;
		if (parseInt(document.getElementById('currentPulls_weapon').value) < 0)
			document.getElementById('currentPulls_weapon').value = 0;
		if (parseInt(document.getElementById('targetFiveStars').value) < 0)
			document.getElementById('targetFiveStars').value = 0;
		if (parseInt(document.getElementById('targetFiveStars_weapon').value) < 0)
			document.getElementById('targetFiveStars_weapon').value = 0;
		if (parseInt(document.getElementById('hardCount').value) < 0)
			document.getElementById('hardCount').value = 0;
		if (parseInt(document.getElementById('hardCount').value) > 3)
			document.getElementById('hardCount').value = 3;

		
		setTimeout(() => {
			// 記錄開始時間
			const startTime = new Date();

			// 取得表單的數據
			const poolType = document.querySelector('input[name="poolType"]:checked')?.value || '未選擇';
			const currentPulls = parseInt(document.getElementById('currentPulls').value) || 0;
			const currentPulls_weapon = parseInt(document.getElementById('currentPulls_weapon').value) || 0;

			const targetFiveStars = parseInt(document.getElementById('targetFiveStars').value) || 0;
			const targetFiveStars_weapon = parseInt(document.getElementById('targetFiveStars_weapon').value) || 0;
			const simTimes = parseInt(document.getElementById('simTimes').value) || 1000000;

			//小保歪次數
			let hartIn = 0;
			let hartOut = 0;

			let cluster = new StatisticsCluster();
			switch (poolType) {
				case "yuan":
					for (let i = 0; i < simTimes; i++) {
						let pullsTimes = currentPulls + 1;
						let totalPull = 0;
						let hardPity = document.getElementById('hardPity').checked ? true : false;
						let hardCount = parseInt(document.getElementById('hardCount').value) || 0;
						for (let fiveStars = 0; fiveStars < targetFiveStars;) {
							totalPull = totalPull + 1;
							let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
							for (; !calculateRandomOutcome(random);) {
								//						console.log("c"+pullsTimes);
								pullsTimes = pullsTimes + 1;
								totalPull = totalPull + 1;
								random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
							}
							if (hardPity) {
								fiveStars = fiveStars + 1;
								hardPity = false;
							} else {
								if (hardCount == 3){
									fiveStars = fiveStars + 1;
									hartIn = hartIn + 1;
									hardCount = 1 ;
								}
								else if (hardCount == 2) {
									if (calculateRandomOutcome(600)) {
										fiveStars = fiveStars + 1;
										hartIn = hartIn + 1;
										hardCount = 1;
									}
									else {
										hardPity = true;
										hartOut = hartOut + 1;
										hardCount = hardCount + 1 ;
									}
								}
								else if (calculateRandomOutcome(500)) {
									fiveStars = fiveStars + 1;
									hartIn = hartIn + 1;
									if (hardCount>0)
										hardCount = hardCount - 1 ;
								} else {
									hardPity = true;
									hartOut = hartOut + 1;
									hardCount = hardCount + 1 ;
								}
							}
							pullsTimes = 1;
						}

						pullsTimes = currentPulls_weapon + 1;
						hardPity = document.getElementById('hardPity_weapon').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars_weapon;) {
							totalPull = totalPull + 1;
							let random = pullsTimes < 62 ? 7 : (pullsTimes < 74 ? (pullsTimes - 62) * 70 + 7 : (pullsTimes - 73) * 3.5 + 777);
							for (; !calculateRandomOutcome(random);) {
								//						console.log("w"+pullsTimes);
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

						pullsTimes = currentPulls_weapon + 1;
						hardPity = document.getElementById('hardPity_weapon').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars_weapon;) {
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

						pullsTimes = currentPulls_weapon + 1;
						hardPity = document.getElementById('hardPity_weapon').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars_weapon;) {
							totalPull = totalPull + 1;
							let random = pullsTimes >= 80 ? 1000: (pullsTimes < 65 ? 10 : (70+(pullsTimes - 65) * 60));
							for (; !calculateRandomOutcome(random);) {
								pullsTimes = pullsTimes + 1;
								totalPull = totalPull + 1
								random = pullsTimes >= 80 ? 1000: (pullsTimes < 65 ? 10 : (70+(pullsTimes - 65) * 60));
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
					}
					break;
				default:
					break;
			}
			const average = cluster.getAverage();
			const min = cluster.getMin();
			const max = cluster.getMax();
			const median = cluster.getMedian();

			// 記錄結束時間
			const endTime = new Date();

			// 計算運行時間（以毫秒為單位）
			const elapsedTime = endTime - startTime;

			// 計算百分比
			let total = hartIn + hartOut;
			let percentage = 0;

			if (total > 0) {
				percentage = (hartIn / total) * 100;
			}





			// 收集數據用於圖表
			const pullData = cluster.getData();
			const pullCounts = {};

			// 統計每個抽取次數出現的頻率
			pullData.forEach(pull => {
				if (pullCounts[pull]) {
					pullCounts[pull]++;
				} else {
					pullCounts[pull] = 1;
				}
			});

			const totalPulls = pullData.length; // 總抽取次數

			// 將統計結果轉換為百分比並計算累計百分比
			const labels = Object.keys(pullCounts);
			const percentages = Object.values(pullCounts).map(count => (count / totalPulls) * 100);
			const cumulativePercentages = [];

			let p10d = 0;
			let p90d = 0;
			// 計算累計百分比
			percentages.reduce((acc, curr) => {
				const cumulative = acc + curr;				
				if (p10d === 0 && cumulative >= 10)
					p10d=labels[cumulativePercentages.length];
				if (p90d === 0 && cumulative >= 90)
					p90d=labels[cumulativePercentages.length];
				cumulativePercentages.push(cumulative.toFixed(2)); // 保留兩位小數

				return cumulative;
			}, 0);
			
			
			// 構建結果字符串
			const resultText = `
期望值: ${average}
10%達成率: ${p10d}
50%中位數: ${median}
90%達成率: ${p90d}
運行時間: ${elapsedTime} 毫秒`;
			//	小保命中: ${percentage.toFixed(2)}%

			// 顯示結果到textarea
			document.getElementById('result').value = resultText.trim();

			// 創建圖表
			const ctx = document.getElementById('resultChart').getContext('2d');

			if (window.resultChart instanceof Chart) {
				window.resultChart.destroy();
			}

			// 新建圖表
			window.resultChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [{
						label: '累計百分比 (%)',
						data: cumulativePercentages,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						x: {
							title: {
								display: true,
								text: '抽取次數'
							}
						},
						y: {
							title: {
								display: true,
								text: '累計百分比 (%)'
							},
							beginAtZero: true,
							max: 100 // 確保 y 軸的範圍不會超過 100%
						}
					}
				}
			});

			resolve();
		}, 50); 
	});
}

class StatisticsCluster {
	constructor() {
		this.data = [];
		this.min = Infinity;
		this.max = -Infinity;
		this.sum = 0;
		this.avg = 0;
	}

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

	getAverage() {
		return this.avg;
	}

	getMin() {
		return this.min;
	}

	getMax() {
		return this.max;
	}

	getData() {
		return this.data;
	}

	getMedian() {
		if (this.data.length === 0) return null;

		const sortedData = [...this.data].sort((a, b) => a - b);
		const midIndex = Math.floor(sortedData.length / 2);

		return sortedData.length % 2 !== 0
			? sortedData[midIndex]
			: (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
	}
}

document.querySelectorAll('input[name="poolType"]').forEach(radio => {
	radio.addEventListener('change', function() {
		const selectedPoolType = document.querySelector('input[name="poolType"]:checked').value;
		const hardCountSection = document.getElementById('hardCount');
		const hardCountLabelSection = document.getElementById('hardCountLabel');

		if (selectedPoolType === 'yuan') {
			hardCountSection.style.display = 'inline';
			hardCountLabelSection.style.display = 'inline';
		} else {
			hardCountSection.style.display = 'none';
			hardCountLabelSection.style.display = 'none';
		}
	});
});

window.onload = function() {
	const selectedPoolType = document.querySelector('input[name="poolType"]:checked').value;
	const hardCountSection = document.getElementById('hardCount');
	const hardCountLabelSection = document.getElementById('hardCountLabel');
	if (selectedPoolType === 'yuan') {
		hardCountSection.style.display = 'inline';
		hardCountLabelSection.style.display = 'inline';
	} else {
		hardCountSection.style.display = 'none';
		hardCountLabelSection.style.display = 'none';
	}
};
