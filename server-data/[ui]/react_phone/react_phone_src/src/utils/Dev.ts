function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}

const generatePhone = () => {
  return `${randomInteger(100, 999)}-${randomInteger(10, 99)}-${randomInteger(10, 99)}`;
};

const DEV_CONTACTS: IContact[] = [
  {
    id: 1,
    name: 'Myrvyn Grigolon',
    last_name: 'Grigolon',
    email: 'mgrigolon0@clickbank.net',
    gender: 'Male',
    favorite: true,
    avatar: 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/batman-icon.png',
  },
  {
    id: 2,
    name: 'Adriana Deignan',
    last_name: 'Deignan',
    email: 'adeignan1@miibeian.gov.cn',
    gender: 'Female',
  },
  {
    id: 3,
    name: 'Rozamond Yetts',
    last_name: 'Yetts',
    email: 'ryetts2@blinklist.com',
    gender: 'Female',
  },
  {
    id: 4,
    name: 'Sorcha Braundt',
    last_name: 'Braundt',
    email: 'sbraundt3@trellian.com',
    gender: 'Female',
    favorite: true,
  },
  {
    id: 5,
    name: 'Merci Letixier',
    last_name: 'Letixier',
    email: 'mletixier4@amazon.co.uk',
    gender: 'Female',
  },
  {
    id: 6,
    name: 'Thia Kalisz',
    last_name: 'Kalisz',
    email: 'tkalisz5@wikipedia.org',
    gender: 'Female',
  },
  {
    id: 7,
    name: 'Zaccaria Abrey',
    last_name: 'Abrey',
    email: 'zabrey6@about.me',
    gender: 'Male',
    favorite: true,
  },
  {
    id: 8,
    name: 'Westley Ivushkin',
    last_name: 'Ivushkin',
    email: 'wivushkin7@tamu.edu',
    gender: 'Male',
  },
  {
    id: 9,
    name: 'Crissy David',
    last_name: 'David',
    email: 'cdavid8@sogou.com',
    gender: 'Female',
  },
  {
    id: 10,
    name: 'Reena Went',
    last_name: 'Went',
    email: 'rwent9@squarespace.com',
    gender: 'Female',
  },
  {
    id: 11,
    name: 'Dannie Crook',
    last_name: 'Crook',
    email: 'dcrooka@indiatimes.com',
    gender: 'Female',
  },
  {
    id: 12,
    name: 'Borg Whyman',
    last_name: 'Whyman',
    email: 'bwhymanb@mysql.com',
    gender: 'Male',
    favorite: true,
  },
  {
    id: 13,
    name: 'Sileas Skinner',
    last_name: 'Skinner',
    email: 'sskinnerc@nifty.com',
    gender: 'Female',
  },
  {
    id: 14,
    name: 'Ninette Fludgate',
    last_name: 'Fludgate',
    email: 'nfludgated@china.com.cn',
    gender: 'Female',
  },
  {
    id: 15,
    name: 'Inglebert Mosdill',
    last_name: 'Mosdill',
    email: 'imosdille@mysql.com',
    gender: 'Male',
    favorite: true,
  },
  {
    id: 16,
    name: 'Dyna Stambridge',
    last_name: 'Stambridge',
    email: 'dstambridgef@tripod.com',
    gender: 'Female',
  },
  {
    id: 17,
    name: 'Meryl Furlonge',
    last_name: 'Furlonge',
    email: 'mfurlongeg@theglobeandmail.com',
    gender: 'Male',
  },
  {
    id: 18,
    name: 'Zacherie Bampton',
    last_name: 'Bampton',
    email: 'zbamptonh@ftc.gov',
    gender: 'Male',
  },
  {
    id: 19,
    name: 'Birdie Latek',
    last_name: 'Latek',
    email: 'blateki@nymag.com',
    gender: 'Female',
  },
  {
    id: 20,
    name: 'Bridget Castillo',
    last_name: 'Castillo',
    email: 'bcastilloj@sogou.com',
    gender: 'Female',
  },
  {
    id: 21,
    name: 'Ashely Trowsdale',
    last_name: 'Trowsdale',
    email: 'atrowsdalek@mapy.cz',
    gender: 'Female',
  },
  {
    id: 22,
    name: 'Merell Manuele',
    last_name: 'Manuele',
    email: 'mmanuelel@rambler.ru',
    gender: 'Male',
  },
  {
    id: 23,
    name: 'Georgeanna Klug',
    last_name: 'Klug',
    email: 'gklugm@liveinternet.ru',
    gender: 'Female',
  },
  {
    id: 24,
    name: 'Coralie Walaron',
    last_name: 'Walaron',
    email: 'cwalaronn@4shared.com',
    gender: 'Female',
  },
  {
    id: 25,
    name: 'Giffard Embling',
    last_name: 'Embling',
    email: 'gemblingo@cafepress.com',
    gender: 'Male',
  },
  {
    id: 26,
    name: 'Brittni Goodinge',
    last_name: 'Goodinge',
    email: 'bgoodingep@yolasite.com',
    gender: 'Female',
  },
  {
    id: 27,
    name: 'Faustine Moogan',
    last_name: 'Moogan',
    email: 'fmooganq@360.cn',
    gender: 'Female',
  },
  {
    id: 28,
    name: 'Evonne Getty',
    last_name: 'Getty',
    email: 'egettyr@si.edu',
    gender: 'Female',
  },
  {
    id: 29,
    name: 'Norris Perigoe',
    last_name: 'Perigoe',
    email: 'nperigoes@amazon.co.uk',
    gender: 'Male',
  },
  {
    id: 30,
    name: 'Freida Whapple',
    last_name: 'Whapple',
    email: 'fwhapplet@networkadvertising.org',
    gender: 'Female',
  },
  {
    id: 31,
    name: 'Reta Shobbrook',
    last_name: 'Shobbrook',
    email: 'rshobbrooku@npr.org',
    gender: 'Female',
  },
  {
    id: 32,
    name: 'Roland Alderwick',
    last_name: 'Alderwick',
    email: 'ralderwickv@gmpg.org',
    gender: 'Male',
  },
  {
    id: 33,
    name: 'Verile Beams',
    last_name: 'Beams',
    email: 'vbeamsw@dedecms.com',
    gender: 'Female',
  },
  {
    id: 34,
    name: 'Elsbeth Cradick',
    last_name: 'Cradick',
    email: 'ecradickx@feedburner.com',
    gender: 'Female',
  },
  {
    id: 35,
    name: 'Lon Jarmyn',
    last_name: 'Jarmyn',
    email: 'ljarmyny@rambler.ru',
    gender: 'Male',
  },
  {
    id: 36,
    name: 'Ferguson Coventry',
    last_name: 'Coventry',
    email: 'fcoventryz@microsoft.com',
    gender: 'Male',
  },
  {
    id: 37,
    name: 'Waiter Simpkiss',
    last_name: 'Simpkiss',
    email: 'wsimpkiss10@walmart.com',
    gender: 'Male',
  },
  {
    id: 38,
    name: 'Gabbi Yanne',
    last_name: 'Yanne',
    email: 'gyanne11@ucoz.ru',
    gender: 'Female',
  },
  {
    id: 39,
    name: 'Annadiana Degli Antoni',
    last_name: 'Degli Antoni',
    email: 'adegli12@ezinearticles.com',
    gender: 'Female',
  },
  {
    id: 40,
    name: 'Alicea Ingrey',
    last_name: 'Ingrey',
    email: 'aingrey13@phoca.cz',
    gender: 'Female',
  },
];

const generateLastCall = hours => {
  return Date.now() - Math.floor(1 * 3.6e6 * hours);
};

const DEV_RECENTS: IRecent[] = [
  {
    id: 1,
    last_call: generateLastCall(10),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 2,
    last_call: generateLastCall(20),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 3,
    last_call: generateLastCall(30),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 4,
    last_call: generateLastCall(40),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 5,
    last_call: generateLastCall(50),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 6,
    last_call: generateLastCall(60),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 7,
    last_call: generateLastCall(70),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 8,
    last_call: generateLastCall(80),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 9,
    last_call: generateLastCall(90),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 10,
    last_call: generateLastCall(100),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 11,
    last_call: generateLastCall(110),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
  {
    id: 12,
    last_call: generateLastCall(120),
    sim_number: '123-45-67',
    from_number: '234-56-78',
  },
];

DEV_CONTACTS.forEach(out => {
  out.phone = generatePhone();
});

const generateLastMessage = hours => {
  return Date.now() - Math.floor(10 * 3.6e6 * hours);
};

// eslint-disable-next-line import/no-mutable-exports
let DEV_LASTMESSAGES = [];
for (let n = 0; n < 10; n += 1) {
  const randContact = DEV_CONTACTS[n];
  DEV_LASTMESSAGES.push({
    phone: randContact.phone,
    date: generateLastMessage(n),
    text: `TEST SMS Text ${n}`,
  });
}

// eslint-disable-next-line no-self-assign
DEV_LASTMESSAGES = DEV_LASTMESSAGES;

const DEV_CONTACTMESSAGES = [];
if (DEV_CONTACTMESSAGES.length === 0) {
  for (let n = 0; n < 30; n += 1) {
    const randContact = DEV_CONTACTS[n];
    DEV_CONTACTMESSAGES.push({
      id: n,
      phone: randContact.phone,
      date: generateLastMessage(n),
      incoming: Math.random() > 0.5,
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.`.substr(
        Math.floor(Math.random() * 10),
        Math.floor(10 + Math.random() * 100),
      ),
    });
  }
}

function startDevSession(): void {
  const event: any = new CustomEvent('message');
  event.data = {
    query: 'number/set',
    phone: '827-74-37',
  };
  window.dispatchEvent(event);
}

export {
  generatePhone,
  DEV_CONTACTS,
  DEV_RECENTS,
  DEV_LASTMESSAGES,
  DEV_CONTACTMESSAGES,
  startDevSession,
};
