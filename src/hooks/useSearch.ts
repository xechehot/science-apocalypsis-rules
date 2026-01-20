import { useState, useMemo } from 'react';
import type { SearchResult } from '../types';
import { gameRulesData } from '../data/gameRules';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];

    const normalizedQuery = query.toLowerCase().trim();
    const matches: SearchResult[] = [];

    // Search in rules
    gameRulesData.rules.forEach(rule => {
      if (
        rule.title.toLowerCase().includes(normalizedQuery) ||
        rule.content.toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          type: 'rule',
          id: rule.id,
          title: rule.title,
          content: rule.content,
          category: rule.category
        });
      }
    });

    // Search in glossary
    gameRulesData.glossary.forEach(term => {
      if (
        term.term.toLowerCase().includes(normalizedQuery) ||
        term.definition.toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          type: 'glossary',
          id: term.id,
          title: term.term,
          content: term.definition,
          category: term.category
        });
      }
    });

    // Search in setup steps
    gameRulesData.setup.forEach(step => {
      if (
        step.instruction.toLowerCase().includes(normalizedQuery) ||
        (step.note && step.note.toLowerCase().includes(normalizedQuery))
      ) {
        matches.push({
          type: 'setup',
          id: `setup-${step.step}`,
          title: `Шаг ${step.step}`,
          content: step.instruction
        });
      }
    });

    // Search in turn phases
    gameRulesData.turnStructure.phases.forEach(phase => {
      const phaseMatches =
        phase.name.toLowerCase().includes(normalizedQuery) ||
        phase.description.toLowerCase().includes(normalizedQuery) ||
        phase.actions.some(
          a =>
            a.name.toLowerCase().includes(normalizedQuery) ||
            a.description.toLowerCase().includes(normalizedQuery)
        );

      if (phaseMatches) {
        matches.push({
          type: 'phase',
          id: phase.id,
          title: phase.name,
          content: phase.description
        });
      }
    });

    // Search in exceptions
    gameRulesData.exceptions.forEach(exc => {
      if (
        exc.rule.toLowerCase().includes(normalizedQuery) ||
        exc.exception.toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          type: 'exception',
          id: exc.id,
          title: exc.rule,
          content: exc.exception
        });
      }
    });

    // Search in tips
    gameRulesData.tips.forEach(tip => {
      if (
        tip.title.toLowerCase().includes(normalizedQuery) ||
        tip.content.toLowerCase().includes(normalizedQuery)
      ) {
        matches.push({
          type: 'tip',
          id: tip.id,
          title: tip.title,
          content: tip.content,
          category: tip.category
        });
      }
    });

    return matches;
  }, [query]);

  return {
    query,
    setQuery,
    results,
    hasResults: results.length > 0
  };
}
