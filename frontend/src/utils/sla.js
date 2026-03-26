export const SLA_HOURS = {
  high: 4,
  medium: 12,
  low: 24,
};

/**
 * Calculates the exact SLA deadline given a creation date and priority.
 */
export const calculateSLA = (createdAt, priority) => {
  const date = new Date(createdAt);
  const hours = SLA_HOURS[priority?.toLowerCase()] || 24;
  date.setHours(date.getHours() + hours);
  return date;
};

/**
 * Computes the current SLA status (whether it's overdue, the formatted text, and escalation level).
 */
export const getSLAStatus = (createdAt, priority) => {
  if (!createdAt || !priority) return null;

  const deadline = calculateSLA(createdAt, priority);
  const now = new Date();
  const diffMs = deadline - now;
  const isOverdue = diffMs < 0;

  const absDiff = Math.abs(diffMs);
  const hours = Math.floor(absDiff / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  let escalationLevel = null;
  if (isOverdue) {
    // Escalation Logic:
    // L1: < 4 hours overdue
    // L2: 4 - 12 hours overdue
    // L3: > 12 hours overdue
    if (hours < 4) {
      escalationLevel = 'L1';
    } else if (hours < 12) {
      escalationLevel = 'L2';
    } else {
      escalationLevel = 'L3';
    }
  }

  return {
    isOverdue,
    escalationLevel,
    formattedText: isOverdue
      ? `Overdue by ${hours}h ${minutes}m`
      : `${hours}h ${minutes}m remaining`,
  };
};
