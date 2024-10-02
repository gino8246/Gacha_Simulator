function calculateRandomOutcome(probability) {
	const randomValue = Math.floor(Math.random() * 1000);
	return randomValue < probability;
}

document.getElementById('simulateButton').addEventListener('click', function() {
	// 記錄開始時間
	const startTime = new Date();

	// 取得表單的數據
	const poolType = document.querySelector('input[name="poolType"]:checked')?.value || '未選擇';
//	const drawType = document.querySelector('input[name="drawType"]:checked')?.value || '未選擇';
	const currentPulls = parseInt(document.getElementById('currentPulls').value) || 0;
	const currentPulls_weapon = parseInt(document.getElementById('currentPulls_weapon').value) || 0;

	const targetFiveStars = parseInt(document.getElementById('targetFiveStars').value) || 0;
	const targetFiveStars_weapon = parseInt(document.getElementById('targetFiveStars_weapon').value) || 0;
	const simTimes = parseInt(document.getElementById('simTimes').value) || 1000000;

	//小保歪次數
    let hartIn = 0 ;
	let hartOut = 0 ;	
	
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
						hardCount = hardCount + 1;
					} else {
						if (hardCount < 2) {
							if (calculateRandomOutcome(500)) {
								fiveStars = fiveStars + 1;
								//	小保中了不重置捕獲明光(待確認)
								//	hardCount = 0;
								hartIn = hartIn + 1;
							} else {
								hardPity = true;
								hartOut = hartOut + 1;
							}
						}
						else if (hardCount == 2) {
							if (calculateRandomOutcome(750)) {
								fiveStars = fiveStars + 1;
								hardCount = 0;
								hartIn = hartIn + 1;
							} else {
								hardPity = true;
								hartOut = hartOut + 1;
							}
						}
						else {
							fiveStars = fiveStars + 1;
							hardCount = 0;
							hartIn = hartIn + 1;
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
		default:
			break;
	}
	const average = cluster.getAverage();
	const min = cluster.getMin() ;
	const max = cluster.getMax() ;
	const median = cluster.getMedian();

	// 記錄結束時間
	const endTime = new Date();

	// 計算運行時間（以毫秒為單位）
	const elapsedTime = endTime - startTime;

	// 計算百分比
	let total = hartIn + hartOut;
	let percentage = 0;

	// 確保 total 不為 0 以避免除以 0 的錯誤
	if (total > 0) {
	    percentage = (hartIn / total) * 100;
	}
	
	// 構建結果字符串
	const resultText = `
期望值: ${average}
最小值: ${min}
最大值: ${max}
中位數: ${median}
運行時間: ${elapsedTime} 毫秒
    `;
//	小保命中: ${percentage.toFixed(2)}%

	// 顯示結果到textarea
	document.getElementById('result').value = resultText.trim();
	
	
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

	// 將統計結果轉換為圖表格式
	const labels = Object.keys(pullCounts);
	const data = Object.values(pullCounts);
	
	// 創建圖表
	const ctx = document.getElementById('resultChart').getContext('2d');

	// 檢查是否已經有圖表存在，如果存在且是 Chart 實例則銷毀它
	if (window.resultChart instanceof Chart) {
	    window.resultChart.destroy();
	}

	// 新建圖表
	window.resultChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: labels,
	        datasets: [{
	            label: '抽取次數出現的次數',
	            data: data,
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
	                    text: '出現次數'
	                },
	                beginAtZero: true
	            }
	        }
	    }
	});
	
	
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
	
	getData() {
	    return this.data;
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
