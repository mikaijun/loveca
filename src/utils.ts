/**
 * 二項係数（組み合わせの数）を計算
 *
 * 「n個の中からk個を選ぶ方法が何通りあるか」を求める関数。
 *
 * 例: 5人の中から2人を選ぶ場合、何通りの選び方があるか？
 *
 * @param n 全体の数
 * @param k 選ぶ数
 * @returns 選び方の総数
 */
const binomialCoefficient = (n: number, k: number): number => {
  if (k > n) return 0 // 選ぶ数が全体の数を超えた場合は不可能
  if (k === 0 || k === n) return 1 // 0個またはすべて選ぶ場合は1通り

  let coefficient = 1
  for (let i = 1; i <= k; i++) {
    coefficient *= (n - i + 1) / i // 順番を考えない組み合わせを計算
  }
  return coefficient
}

/**
 * 特定のものを選ぶ確率（超幾何分布の計算）
 *
 * 「全体の中から一部を選んだとき、特定の要素が指定の数だけ含まれる確率」を求める関数。
 *
 * 例: 60個の中に5個の当たりがあり、そこからランダムに6個選ぶとき、
 * ちょうど1個の当たりを引く確率を求められる。
 *
 * @param totalItems 全体の数
 * @param targetItems 特定の要素の総数
 * @param drawCount 選ぶ数
 * @param successCount ちょうど引く数
 * @returns その確率（0〜1の値）
 */
export const chanceOfPicking = (
  totalItems: number, // 全体の総数
  targetItems: number, // 特定の要素の総数
  drawCount: number, // 選ぶ数
  successCount: number // ちょうど成功する数
): number => {
  if (
    successCount > drawCount ||
    successCount > targetItems ||
    drawCount > totalItems
  )
    return 0
  return (
    (binomialCoefficient(targetItems, successCount) *
      binomialCoefficient(totalItems - targetItems, drawCount - successCount)) /
    binomialCoefficient(totalItems, drawCount)
  )
}
