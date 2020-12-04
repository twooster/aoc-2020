console.log(
  require('fs').readFileSync('./input', 'utf8').split('\n').reduce(([c, a], l) =>
    l === ''
      ? [
          [
            a.match(/\b\w{3}:[^\s]*\b/g),
            a.match(/\b((cid:[^\s]*)|(byr:(19[2-9]\d|200[0-2]))|(iyr:20(1[0-9]|20))|(eyr:20(2[0-9]|30))|(hgt:(1([5-8][0-9]|9[0-3])cm|(59|6[0-9]|7[0-6])in))|(hcl:#[0-9a-f]{6})|(ecl:(amb|blu|brn|gry|grn|hzl|oth))|(pid:[0-9]{9}))\b/g)
          ].map(x => (x || []).map(x => x.slice(0, 3))).map((ks, i) => c[i] + (['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(k => ks.includes(k)) & 1)),
          ''
        ]
      : [c, a+' '+l],
    [[0, 0], '']
  )[0]
)
