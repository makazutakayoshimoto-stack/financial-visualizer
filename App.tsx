import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Home, Wallet, CreditCard, Building, Users, ShoppingCart } from 'lucide-react';

const FinancialStatementVisualizer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);

  // サンプル財務データ（実際のデータに置き換え可能）
  const sampleData = {
    balanceSheet: {
      assets: {
        cash: 5000000,
        inventory: 3000000,
        equipment: 8000000,
        total: 16000000
      },
      liabilities: {
        loans: 4000000,
        payables: 2000000,
        total: 6000000
      },
      equity: 10000000
    },
    incomeStatement: {
      revenue: 15000000,
      costs: 9000000,
      expenses: 4000000,
      profit: 2000000
    },
    cashFlow: [
      { month: '1月', operating: 800000, investing: -500000, financing: -200000 },
      { month: '2月', operating: 1200000, investing: -300000, financing: 0 },
      { month: '3月', operating: 900000, investing: -800000, financing: 500000 },
      { month: '4月', operating: 1500000, investing: -200000, financing: -300000 },
      { month: '5月', operating: 1100000, investing: -600000, financing: 0 },
      { month: '6月', operating: 1300000, investing: -400000, financing: -200000 }
    ]
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number | string | (string | number)[] | undefined) => {
    let numAmount: number;
    if (Array.isArray(amount)) {
      numAmount = typeof amount[0] === 'string' ? parseFloat(amount[0]) : Number(amount[0]);
    } else if (typeof amount === 'string') {
      numAmount = parseFloat(amount);
    } else if (typeof amount === 'number') {
      numAmount = amount;
    } else {
      return '0百万円';
    }
    
    if (isNaN(numAmount)) {
      return '0百万円';
    }
    
    return `${(numAmount / 1000000).toFixed(1)}百万円`;
  };

  const BalanceSheetHouse = () => {
    const { assets, liabilities, equity } = sampleData.balanceSheet;
    
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
          <Home className="inline mr-2" />
          会社の「家」の状況（貸借対照表）
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          会社を一軒の家に例えて、何を持っていて、どんな借金があるかを見てみましょう
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold text-green-700 mb-3 flex items-center">
              <Building className="mr-2" />
              家の中身（資産）
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <div className="flex items-center">
                  <Wallet className="mr-2 text-green-600" size={16} />
                  <span className="text-sm">現金・預金</span>
                </div>
                <span className="font-semibold text-green-700">{formatCurrency(assets.cash)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <div className="flex items-center">
                  <ShoppingCart className="mr-2 text-blue-600" size={16} />
                  <span className="text-sm">在庫（商品）</span>
                </div>
                <span className="font-semibold text-blue-700">{formatCurrency(assets.inventory)}</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                <div className="flex items-center">
                  <Building className="mr-2 text-purple-600" size={16} />
                  <span className="text-sm">設備・機械</span>
                </div>
                <span className="font-semibold text-purple-700">{formatCurrency(assets.equipment)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>合計</span>
                <span className="text-green-700">{formatCurrency(assets.total)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                <CreditCard className="mr-2" />
                借金（負債）
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                  <span className="text-sm">銀行からの借入</span>
                  <span className="font-semibold text-red-700">{formatCurrency(liabilities.loans)}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm">支払い予定</span>
                  <span className="font-semibold text-orange-700">{formatCurrency(liabilities.payables)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>借金合計</span>
                  <span className="text-red-700">{formatCurrency(liabilities.total)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
                <Users className="mr-2" />
                実質的な財産（純資産）
              </h4>
              <div className="p-2 bg-blue-50 rounded">
                <div className="flex justify-between font-bold text-lg">
                  <span>会社の正味価値</span>
                  <span className="text-blue-700">{formatCurrency(equity)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  ※資産から借金を引いた残り
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2">📊 バランスチェック</p>
            <div className="flex justify-center items-center space-x-4">
              <span className="text-green-700 font-bold">{formatCurrency(assets.total)}</span>
              <span>=</span>
              <span className="text-red-700 font-bold">{formatCurrency(liabilities.total)}</span>
              <span>+</span>
              <span className="text-blue-700 font-bold">{formatCurrency(equity)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              資産 = 負債 + 純資産（このバランスが取れていることが大切）
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ProfitLossWaterfall = () => {
    const { revenue, costs, expenses, profit } = sampleData.incomeStatement;
    
    return (
      <div className="bg-gradient-to-br from-green-50 to-yellow-100 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
          <TrendingUp className="inline mr-2" />
          お店の売上と利益の流れ（損益計算書）
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          お店の1年間の売上から、最終的にいくら儲かったかを見てみましょう
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between p-3 bg-green-100 rounded mb-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="font-semibold">💰 売上収入</span>
                </div>
                <span className="text-lg font-bold text-green-700">{formatCurrency(revenue)}</span>
              </div>
              <p className="text-sm text-gray-600">商品・サービスを売って得たお金</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between p-3 bg-red-100 rounded mb-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                  <span className="font-semibold">📦 商品原価</span>
                </div>
                <span className="text-lg font-bold text-red-700">-{formatCurrency(costs)}</span>
              </div>
              <p className="text-sm text-gray-600">商品を作る・仕入れるのにかかった費用</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between p-3 bg-orange-100 rounded mb-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                  <span className="font-semibold">🏢 運営費用</span>
                </div>
                <span className="text-lg font-bold text-orange-700">-{formatCurrency(expenses)}</span>
              </div>
              <p className="text-sm text-gray-600">人件費、家賃、光熱費などの運営コスト</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-300">
              <div className="flex items-center justify-between p-3 bg-blue-100 rounded mb-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="font-semibold">✨ 最終利益</span>
                </div>
                <span className="text-lg font-bold text-blue-700">{formatCurrency(profit)}</span>
              </div>
              <p className="text-sm text-gray-600">結果的に会社に残ったお金</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-4 text-center">利益の計算フロー</h4>
            
            <div className="space-y-6">
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">売上収入</span>
                  <span className="text-lg font-bold text-green-700">{formatCurrency(revenue)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-lg h-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-lg flex items-center justify-end pr-2 transition-all duration-1000"
                    style={{width: '100%'}}
                  >
                    <span className="text-white text-xs font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">原価差引後</span>
                  <span className="text-lg font-bold text-blue-700">{formatCurrency(revenue - costs)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-lg h-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-lg flex items-center justify-end pr-2 transition-all duration-1000"
                    style={{width: `${((revenue - costs) / revenue * 100)}%`}}
                  >
                    <span className="text-white text-xs font-semibold">{Math.round((revenue - costs) / revenue * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">最終利益</span>
                  <span className="text-lg font-bold text-purple-700">{formatCurrency(profit)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-lg h-8 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-lg flex items-center justify-end pr-2 transition-all duration-1000"
                    style={{width: `${(profit / revenue * 100)}%`}}
                  >
                    <span className="text-white text-xs font-semibold">{Math.round(profit / revenue * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center items-center space-x-2 text-gray-400">
              <div className="text-center">
                <div className="text-2xl">💰</div>
                <div className="text-xs">売上</div>
              </div>
              <div className="animate-pulse">→</div>
              <div className="text-center">
                <div className="text-2xl">📉</div>
                <div className="text-xs">コスト削減</div>
              </div>
              <div className="animate-pulse">→</div>
              <div className="text-center">
                <div className="text-2xl">✨</div>
                <div className="text-xs">利益</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2">💡 利益率をチェック</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600">売上高</p>
                <p className="font-bold text-green-700">{formatCurrency(revenue)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">総コスト</p>
                <p className="font-bold text-red-700">{formatCurrency(costs + expenses)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">利益率</p>
                <p className="font-bold text-blue-700">{((profit / revenue) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CashFlowRiver = () => {
    const maxValue = Math.max(...sampleData.cashFlow.map(item => 
      Math.max(Math.abs(item.operating), Math.abs(item.investing), Math.abs(item.financing))
    ));

    return (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
          💧 お金の流れ（キャッシュフロー）
        </h3>
        <p className="text-sm text-gray-600 mb-6 text-center">
          会社のお金の流れを川の流れに例えて見てみましょう
        </p>

        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h4 className="font-semibold mb-4 text-center">月別キャッシュフロー</h4>
          <div className="space-y-4">
            {sampleData.cashFlow.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <h5 className="font-semibold mb-2 text-center text-gray-700">{item.month}</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-700 w-20">営業活動</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className="bg-green-500 h-4 rounded-full transition-all duration-500"
                        style={{width: `${Math.abs(item.operating) / maxValue * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-green-700 w-20 text-right">
                      {formatCurrency(item.operating)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-700 w-20">投資活動</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${item.investing >= 0 ? 'bg-yellow-500' : 'bg-red-400'}`}
                        style={{width: `${Math.abs(item.investing) / maxValue * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-yellow-700 w-20 text-right">
                      {formatCurrency(item.investing)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700 w-20">財務活動</span>
                    <div className="flex-1 mx-2 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${item.financing >= 0 ? 'bg-blue-500' : 'bg-red-400'}`}
                        style={{width: `${Math.abs(item.financing) / maxValue * 100}%`}}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-blue-700 w-20 text-right">
                      {formatCurrency(item.financing)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🏢 営業活動</h4>
            <p className="text-sm text-gray-700 mb-2">本業でのお金の出入り</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 商品売上の入金</li>
              <li>• 仕入れ代金の支払い</li>
              <li>• 給料・家賃の支払い</li>
            </ul>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">💼 投資活動</h4>
            <p className="text-sm text-gray-700 mb-2">将来への投資</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 設備・機械の購入</li>
              <li>• 店舗の改装</li>
              <li>• システム導入</li>
            </ul>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🏦 財務活動</h4>
            <p className="text-sm text-gray-700 mb-2">お金の調達・返済</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 銀行からの借入</li>
              <li>• 借金の返済</li>
              <li>• 株主への配当</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const OverviewDashboard = () => {
    const totalAssets = sampleData.balanceSheet.assets.total;
    const totalLiabilities = sampleData.balanceSheet.liabilities.total;
    const equity = sampleData.balanceSheet.equity;
    const profit = sampleData.incomeStatement.profit;
    const revenue = sampleData.incomeStatement.revenue;

    const healthIndicators = [
      {
        name: '自己資本比率',
        value: ((equity / totalAssets) * 100).toFixed(1),
        unit: '%',
        status: (equity / totalAssets) > 0.5 ? 'good' : (equity / totalAssets) > 0.3 ? 'medium' : 'caution',
        description: '借金に頼らない健全性'
      },
      {
        name: '利益率',
        value: ((profit / revenue) * 100).toFixed(1),
        unit: '%',
        status: (profit / revenue) > 0.1 ? 'good' : (profit / revenue) > 0.05 ? 'medium' : 'caution',
        description: '売上からどれだけ利益が出るか'
      },
      {
        name: '流動性',
        value: (sampleData.balanceSheet.assets.cash / 1000000).toFixed(1),
        unit: '百万円',
        status: sampleData.balanceSheet.assets.cash > 3000000 ? 'good' : sampleData.balanceSheet.assets.cash > 1000000 ? 'medium' : 'caution',
        description: 'すぐに使える現金'
      }
    ];

    const getStatusColor = (status: string) => {
      switch(status) {
        case 'good': return 'text-green-600 bg-green-100';
        case 'medium': return 'text-yellow-600 bg-yellow-100';
        case 'caution': return 'text-red-600 bg-red-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getStatusEmoji = (status: string) => {
      switch(status) {
        case 'good': return '😊';
        case 'medium': return '😐';
        case 'caution': return '😰';
        default: return '🤔';
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
            📊 会社の健康診断
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {healthIndicators.map((indicator, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-center">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor(indicator.status)} mb-2`}>
                    <span className="mr-1">{getStatusEmoji(indicator.status)}</span>
                    <span className="font-bold text-lg">{indicator.value}{indicator.unit}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{indicator.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{indicator.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-semibold mb-4 text-center">会社の規模感</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalAssets)}</p>
                <p className="text-sm text-gray-600">総資産</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(revenue)}</p>
                <p className="text-sm text-gray-600">年間売上</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(profit)}</p>
                <p className="text-sm text-gray-600">年間利益</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(equity)}</p>
                <p className="text-sm text-gray-600">純資産</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-center text-gray-800">
            💡 簡単解説
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800 mb-2">🏠 貸借対照表とは？</h4>
              <p className="text-sm text-gray-700">
                会社が「何を持っているか（資産）」と「どこからお金を調達したか（負債・純資産）」を表します。
                家計で言うと、家や車、預金（資産）と、住宅ローンや借金（負債）、自分のお金（純資産）のようなものです。
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="font-semibold text-green-800 mb-2">💰 損益計算書とは？</h4>
              <p className="text-sm text-gray-700">
                一定期間（通常1年間）にどれだけ稼いで、どれだけ使って、最終的にいくら儲かったかを表します。
                家計簿の収入と支出を会社版にしたようなものです。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">財務諸表ビジュアライザー</h1>
        <p className="text-gray-600">会計知識がなくても分かる、会社のお金の流れ</p>
      </div>

      <div className="flex flex-wrap justify-center mb-6 bg-white rounded-lg shadow-md p-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 mx-1 mb-2 rounded-md transition-colors ${
            activeTab === 'overview'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          📊 全体概要
        </button>
        <button
          onClick={() => setActiveTab('balance')}
          className={`px-4 py-2 mx-1 mb-2 rounded-md transition-colors ${
            activeTab === 'balance'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🏠 貸借対照表
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`px-4 py-2 mx-1 mb-2 rounded-md transition-colors ${
            activeTab === 'income'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💰 損益計算書
        </button>
        <button
          onClick={() => setActiveTab('cashflow')}
          className={`px-4 py-2 mx-1 mb-2 rounded-md transition-colors ${
            activeTab === 'cashflow'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💧 キャッシュフロー
        </button>
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'overview' && <OverviewDashboard />}
        {activeTab === 'balance' && <BalanceSheetHouse />}
        {activeTab === 'income' && <ProfitLossWaterfall />}
        {activeTab === 'cashflow' && <CashFlowRiver />}
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">📝 使い方</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 上部のタブをクリックして、見たい財務諸表を選択できます</li>
          <li>• 各数値にマウスを重ねると詳細情報が表示されます</li>
          <li>• サンプルデータは実際の試算表データに置き換えることができます</li>
          <li>• 色分けで健全性を直感的に理解できるようになっています</li>
        </ul>
      </div>
    </div>
  );
};

export default FinancialStatementVisualizer;