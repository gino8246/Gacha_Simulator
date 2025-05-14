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
			
			const target4Stars = parseInt(document.getElementById('target4Stars').value) || 0;
			const current4Pulls = parseInt(document.getElementById('current4Pulls').value) || 0;

			//小保歪次數
			let hartIn = 0;
			let hartOut = 0;
			
			//成功墊抽
			const draw4Star = document.getElementById('draw4Star').checked ? true : false;
			let pull4success = 0 ;

			let cluster = new StatisticsCluster();
			switch (poolType) {
				case "yuan":
					for (let i = 0; i < simTimes; i++) {
						let pullsTimes = currentPulls + 1;
						let totalPull = 0;
						let hardPity = document.getElementById('hardPity').checked ? true : false;
						let hardCount = parseInt(document.getElementById('hardCount').value) || 0;
						
						let pulls4Times = current4Pulls;
						let star4 = 0 ;
						let hard4Pity = document.getElementById('hardPity4').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars;) {
							totalPull = totalPull + 1;
							let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
							for (; !calculateRandomOutcome(random);) {
								//						console.log("c"+pullsTimes);
								pullsTimes = pullsTimes + 1;
								totalPull = totalPull + 1;
								random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
								
								// 沒中五星的情況再計算四星
								if (draw4Star && star4 <target4Stars) {
									pulls4Times = pulls4Times + 1;
									let random4 = pulls4Times <= 8 ? 51 
										: (pulls4Times === 9  ? 562 : 1000);
									if ( calculateRandomOutcome(random4) ){
										pulls4Times=0;
										if (hard4Pity){
											if (calculateRandomOutcome(334)) {
												star4 = star4 + 1 ;
											}
											hard4Pity = false ;
										}
										else {
											if (calculateRandomOutcome(500)) {
												if (calculateRandomOutcome(334)) {
													star4 = star4 + 1 ;
												}
											}
											else {
												hard4Pity = true ;
											}
										}
										
										if (star4 >= target4Stars) {
											pull4success = pull4success + 1;
										}
									}									
								}
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
						
						let pulls4Times = current4Pulls;
						let star4 = 0 ;
						let hard4Pity = document.getElementById('hardPity4').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars;) {
							totalPull = totalPull + 1;
							let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
							for (; !calculateRandomOutcome(random);) {
								pullsTimes = pullsTimes + 1;
								totalPull = totalPull + 1;
								random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
								
								// 沒中五星的情況再計算四星
								if (draw4Star && star4 < target4Stars) {
									pulls4Times = pulls4Times + 1;
									let random4 = pulls4Times <= 8 ? 51
										: (pulls4Times === 9 ? 562 : 1000);
									if (calculateRandomOutcome(random4)) {
										pulls4Times = 0;
										if (hard4Pity) {
											if (calculateRandomOutcome(334)) {
												star4 = star4 + 1;
											}
											hard4Pity = false;
										}
										else {
											if (calculateRandomOutcome(500)) {
												if (calculateRandomOutcome(334)) {
													star4 = star4 + 1;
												}
											}
											else {
												hard4Pity = true;
											}
										}

										if (star4 >= target4Stars) {
											pull4success = pull4success + 1;
										}
									}
								}
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
						
						let pulls4Times = current4Pulls;
						let star4 = 0 ;
						let hard4Pity = document.getElementById('hardPity4').checked ? true : false;
						for (let fiveStars = 0; fiveStars < targetFiveStars;) {
							totalPull = totalPull + 1;
							let random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
							for (; !calculateRandomOutcome(random);) {
								pullsTimes = pullsTimes + 1;
								totalPull = totalPull + 1;
								random = pullsTimes < 74 ? 6 : (pullsTimes - 73) * 60 + 6;
								
								if (draw4Star && star4 < target4Stars) {
									pulls4Times = pulls4Times + 1;
									let random4 = pulls4Times <= 9 ? 94	: 1000;
									if (calculateRandomOutcome(random4)) {
										pulls4Times = 0;
										if (hard4Pity) {
											if (calculateRandomOutcome(500)) {
												star4 = star4 + 1;
											}
											hard4Pity = false;
										}
										else {
											if (calculateRandomOutcome(500)) {
												if (calculateRandomOutcome(500)) {
													star4 = star4 + 1;
												}
											}
											else {
												hard4Pity = true;
											}
										}

										if (star4 >= target4Stars) {
											pull4success = pull4success + 1;
										}
									}
								}
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
							
							// zzz較為特別，S級會吞A級的保底
							pulls4Times = 0 ;

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
			
			
			const isHardPityEnabled = document.getElementById('draw4Star').checked;
			let extraLine = '';
			if (isHardPityEnabled) {
			    const successRate = ((pull4success / simTimes) * 100).toFixed(2);
			    extraLine = `<p>4星達標成功率: ${successRate}%</p>`;
			}
			
			const resultDiv = document.getElementById('result');
			resultDiv.style.backgroundColor = '#e6f7ff';
			resultDiv.style.padding = '10px';
			resultDiv.style.borderRadius = '5px';
			resultDiv.innerHTML = `
			        <p>期望值: ${average}</p>
			        <p>10%達成率: ${p10d}</p>
			        <p>50%中位數: ${median}</p>
			        <p>90%達成率: ${p90d}</p>
					${extraLine}
			        <p>運行時間: ${elapsedTime} 毫秒</p>
			    `;
				
			if (document.getElementById('hardPity4').checked ? true : false) {
				resultDiv
			}
			//	小保命中: ${percentage.toFixed(2)}%

			// 顯示結果到textarea
//			document.getElementById('result').value = resultText.trim();

			// 創建圖表
			const ctx = document.getElementById('resultChart').getContext('2d');

			if (window.resultChart instanceof Chart) {
				window.resultChart.destroy();
			}

			// 新建圖表
			window.resultChart = new Chart(ctx, {
			    type: 'line', // 折線圖類型
			    data: {
			        labels: labels, // x 軸標籤
			        datasets: [{
			            label: '累計百分比 (%)',
			            data: cumulativePercentages, // 數據
			            backgroundColor: 'rgba(54, 162, 235, 0.2)', 
			            borderColor: 'rgba(54, 162, 235, 1)', 
			            borderWidth: 2, 
			            fill: true, 
			            pointRadius: 0
			        }]
			    },
			    options: {
			        interaction: {
			            mode: 'nearest',
			            axis: 'x', 
			            intersect: false 
			        },
			        plugins: {
			            tooltip: {
			                callbacks: {
			                    label: function(context) {
			                        return `${context.dataset.label}: ${context.raw}%`;
			                    }
			                }
			            }
			        },
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
			                max: 100 
			            }
			        },
			        elements: {
			            line: {
			                tension: 0.4 
			            },
			            point: {
			                hoverRadius: 8, // 增大懸停時數據點的半徑
			                hitRadius: 10 // 增大數據點可被懸停的區域
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

		const loadingImg = document.querySelector('#loadingOverlay img');
		
		if (selectedPoolType === 'yuan') {
			hardCountSection.style.display = 'inline';
			hardCountLabelSection.style.display = 'inline';
			loadingImg.src = `image/gi_load.gif`;
		} else if (selectedPoolType === 'tie') {
			hardCountSection.style.display = 'none';
			hardCountLabelSection.style.display = 'none';
			loadingImg.src = `image/37.gif`;
		} else if (selectedPoolType === 'jue') {
			hardCountSection.style.display = 'none';
			hardCountLabelSection.style.display = 'none';
			loadingImg.src = `image/zzz_load.gif`;
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
	
	
	// TODO 翻譯功能未完成
//	const container = document.querySelector('.container');
//	const userLanguage = 'en';
//	//const userLanguage = navigator.language || navigator.userLanguage;
//	console.log(userLanguage) ;
//	if (container) {
//	    const htmlContent = container.innerHTML;
//	    
//	    if (userLanguage.startsWith('ja')) {
//	        container.innerHTML = translateHtml(htmlContent, 'japanese');
//	    } else if (userLanguage.startsWith('zh') || ['zh-CN', 'zh-TW', 'zh-HK', 'zh-MO', 'zh-SG'].includes(userLanguage)) {
//	        // 中文語系維持繁中，無需翻譯
//	        return;
//	    } else {
//	        container.innerHTML = translateHtml(htmlContent, 'english');
//	    }
//	}
};

document.addEventListener('DOMContentLoaded', function () {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('click', (e) => {
            //e.preventDefault();
            // Toggle active class on click
            tooltip.classList.toggle('active');
        });

        // Close tooltip if clicked outside
        document.addEventListener('click', (event) => {
            if (!tooltip.contains(event.target)) {
                tooltip.classList.remove('active');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const draw4StarCheckbox = document.getElementById('draw4Star');
    const form4StarsSection = document.querySelector('.form4stars');

    function toggleForm4Stars() {
        form4StarsSection.style.display = draw4StarCheckbox.checked ? 'block' : 'none';
    }

    toggleForm4Stars();
    draw4StarCheckbox.addEventListener('change', toggleForm4Stars);
});

function translateHtml(html, language) {
    let translatedHtml = html;
    let translationMapToUse = language === 'japanese' ? japaneseTranslationMap : translationMap;
    for (const [chinese, translated] of Object.entries(translationMapToUse)) {
        // 使用正則表達式進行全局替換，確保所有出現的中文都被替換
        const regex = new RegExp(chinese, 'g');
        translatedHtml = translatedHtml.replace(regex, translated);
    }
    return translatedHtml;
}

// 獲取 class="container" 的 innerHTML 並進行翻譯
function translateContainer(language) {
    const container = document.querySelector('.container');
    if (container) {
        container.innerHTML = translateHtml(container.innerHTML, language);
    }
}



const translationMap = {
    "米池計算機": "MHY Gacha Calculator",
    "選擇池類型": "Select Pool Type",
    "原": "Genshin",
    "鐵": "HSR",
    "絕": "ZZZ",
    "目標五星數": "Target five-star number",
	"卡池上一次抽出的5星是非UP角色/武器。":"The last 5-star item drawn from the pool was a non-UP character/weapon.",
	"距離上一次抽出5星後已經抽了多少抽。":"How many draws have been made since the last time you drew 5 stars?",
    "角色": "Character",
    "武器": "Weapon",
    "已墊抽數": "Number of draws",
    "模擬次數": "Simulation Times",
    "卡池已大保底": "The card pool has a guarantee",
	"明光計數器": "Bright light counter",
	"模擬結果": "Simulation Result",
    "模擬": "Simulate",
};


const japaneseTranslationMap = {
    "米池計算機": "ミガチャ計算機",
    "選擇池類型": "ガチャの種類",
    "原": "原神",
    "鐵": "崩スタ",
    "絕": "ZZZ",
    "目標五星數": "目標の五星数:",
    "角色": "キャラクター",
    "武器": "武器",
    "已墊抽數": "現在の抽数",
    "模擬次數": "シミュレーション回数",
    "卡池已大保底": "プールハードピティ",
	"模擬結果": "シミュレーション結果",
    "模擬": "シミュレート",
	"明光計數器": "掴みし明光",
};