// A smarter Tailwind-aware class merge helper
export function cn(...inputs: string[]) {
  const classList = inputs.join(" ").trim().split(/\s+/);

  const groups: Record<string, string> = {};

  const groupMatchers: Record<string, RegExp> = {
    textColor: /^text-(black|white|transparent|current|[a-z]+-\d{1,3})$/,
    textSize: /^text-(xs|sm|base|lg|xl|\d+xl|\[\d+px\])$/,
    textAlign: /^text-(left|center|right|justify)$/,
    textTransform: /^(uppercase|lowercase|capitalize|normal-case)$/,
    textDecoration: /^(underline|line-through|no-underline)$/,

    leading: /^leading-(.*)/,
    tracking: /^tracking-(.*)/,
  };

  for (const cls of classList) {
    let matched = false;

    for (const [groupName, regex] of Object.entries(groupMatchers)) {
      if (regex.test(cls)) {
        groups[groupName] = cls;
        matched = true;
        break;
      }
    }

    if (!matched) {
      groups[cls] = cls;
    }
  }

  return Object.values(groups).join(" ");
}
