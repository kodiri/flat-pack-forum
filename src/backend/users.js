class User {
    constructor(username, userType, uuid, email, location, joinDate = Date.now(), lastActive = Date.now()) {
        this.username = username;
        this.userType = userType;
        this.uuid = uuid;
        this.email = email;
        this.location = location;
        this.joinDate = joinDate;
        this.lastActive = lastActive;
    }
}

function getUsers() {  // Backend's TEMPORARY array of Users
    return [
        new User(
            'RoAvamuri',
            'User',
            0,
            'RoAvamuri@some.email.address.com',
            'USA'
        ),
        new User(
            'xZeronLegends_00x',
            'User',
            1,
            'xZeronLegends_00x@some.email.address.com',
            'USA'
        ),
        new User(
            'MSarah2',
            'User',
            2,
            'MSarah2@some.email.address.com',
            'UK'
        ),
        new User(
            '200JAIN',
            'User',
            3,
            '200JAIN@some.email.address.com',
            'Denmark'
        ),
        new User(
            'markMort',
            'User',
            4,
            'markMort@some.email.address.com',
            'Norway'
        ),
        new User(
            'Anuenooru',
            'User',
            5,
            'Anuenooru@some.email.address.com',
            'France'
        ),
        new User(
            'domdanouseWalker',
            'User',
            6,
            'domdanouseWalker@some.email.address.com',
            'Germany'
        ),
        new User(
            'BarryA',
            'User',
            7,
            'BarryA@some.email.address.com',
            'UK'
        ),
        new User(
            'Patadada',
            'User',
            8,
            'Patadada@some.email.address.com',
            'Portugal'
        ),
        new User(
            '銹嫺',
            'User',
            9,
            '銹嫺@some.email.address.com',
            'China'
        ),
        new User(
            'Peter7737',
            'User',
            10,
            'Peter7737@some.email.address.com',
            'Italy'
        ),
        new User(
            'Infelible_Ireden',
            'User',
            11,
            'Infelible_Ireden@some.email.address.com',
            'Romania'
        ),
        new User(
            'Admin',
            'Admin',
            12,
            'Admin@some.email.address.com',
            'UK'
        ),
        new User(
            'Victor',
            'User',
            13,
            'Victor@some.email.address.com',
            'Poland'
        ),
        new User(
            'БОУЦЛѢ',
            'User',
            14,
            'БОУЦЛѢ@some.email.address.com',
            'Russia'
        ),
    ]
}

module.exports = {User, getUsers};