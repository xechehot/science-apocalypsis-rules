import { gameRulesData } from '../../data/gameRules';
import { Users, Clock, Trophy, Skull, Crown, Dice6, Map, Swords } from 'lucide-react';

export function GameOverview() {
  return (
    <div className="space-y-6">
      {/* Game Info Card */}
      <div className="bg-gradient-to-br from-rose-500 to-rose-700 rounded-lg p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">{gameRulesData.gameInfo.gameName}</h2>
        <p className="text-rose-100 text-sm mb-4">{gameRulesData.gameInfo.theme}</p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>
              {gameRulesData.gameInfo.playerCount.min}-{gameRulesData.gameInfo.playerCount.max} игроков
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{gameRulesData.gameInfo.playTime}</span>
          </div>
        </div>
      </div>

      {/* Win/Loss Conditions */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-green-800 dark:text-green-200">Победа</h3>
          </div>
          <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
            <li className="flex items-start gap-2">
              <Crown className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>Коллективная:</strong> {gameRulesData.winCondition.collective}</span>
            </li>
            <li className="flex items-start gap-2">
              <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span><strong>Личная:</strong> {gameRulesData.winCondition.individual}</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-red-100 dark:bg-red-800 rounded-lg">
              <Skull className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-red-800 dark:text-red-200">Поражение</h3>
          </div>
          <p className="text-sm text-red-700 dark:text-red-300">
            {gameRulesData.winCondition.loss}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <Dice6 className="w-8 h-8 mx-auto mb-2 text-purple-500" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">6</div>
          <div className="text-sm text-gray-500">Характеристик</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
          <div className="text-sm text-gray-500">Классов агентов</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <Map className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
          <div className="text-sm text-gray-500">Регионов</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
          <Swords className="w-8 h-8 mx-auto mb-2 text-orange-500" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
          <div className="text-sm text-gray-500">Трека</div>
        </div>
      </div>

      {/* Characteristics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Характеристики</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gameRulesData.characteristics.map(char => (
            <div
              key={char.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 flex items-center justify-center bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg font-bold text-sm">
                  {char.abbreviation}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">{char.name}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{char.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ресурсы</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {gameRulesData.resources.map(resource => (
            <div
              key={resource.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {resource.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {resource.description}
              </p>
              <div className="text-xs text-gray-500">
                <strong>Применение:</strong>
                <ul className="mt-1 space-y-0.5">
                  {resource.usage.map((use, i) => (
                    <li key={i}>• {use}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Регионы (Карта Плоской Земли)</h3>
        <div className="space-y-3">
          {gameRulesData.regions.map(region => (
            <div
              key={region.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
            >
              <span className="font-medium text-gray-900 dark:text-white min-w-48">
                {region.name}
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {region.bonusOnSuccess && (
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    ✓ {region.bonusOnSuccess}
                  </span>
                )}
                {region.bonusOnFailure && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                    ✗ {region.bonusOnFailure}
                  </span>
                )}
                {region.penalty && (
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                    ⚠ {region.penalty}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-3">Советы</h3>
        <ul className="space-y-2">
          {gameRulesData.tips.map(tip => (
            <li key={tip.id} className="text-sm text-amber-700 dark:text-amber-300">
              <strong>{tip.title}:</strong> {tip.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
