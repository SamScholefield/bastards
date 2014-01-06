/**
 * A crew member aboard a ship.
 *
 * Natural habitat: game.my_ship and game.enemies
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
 */
function Ship(options) {
  this.name = 'name',
  this.affiliation = 'enemy',
  this.power = 20,
  this.max_power = 100,
  this.missiles = 6,
  this.max_missiles = 20,
  this.fuel = 10,
  this.max_fuel = 50,
  this.oxygen = 100,
  this.hull = 20,
  this.max_hull = 100,
  this.type = 'default',
  this.tmpl = '',
  this.x = 0,
  this.y = 0;
  this.crew = [];
  this.section_list = {};
  this.sections = [];
  this.is_dead = false,
  this.weapons = [
    new Weapon(game.available_weapons[0]),
    new Weapon(game.available_weapons[1])
  ];
  this.shipTypes = {
    'default': {
      max_hull: 100,
      section_list: [
        {
          'name': 'Shield',
          'type': 'shield'
        },
        {
          'name': 'Engine',
          'type': 'engine'
        },
        {
          'name': 'O2',
          'type': 'oxygen'
        },
        {
          'name': 'Medic',
          'type': 'medic'
        },
        {
          'name': 'Weapons',
          'type': 'weapons'
        },
        {
          'name': 'Bridge',
          'type': 'bridge'
        }
      ]
    }
  };
  
  this.display = {
    hull: function () { return (this.hull / this.max_hull) * game.bar_width; },
    oxygen: function () { return (this.oxygen / 100) * game.bar_width; },
    power: function () { return (this.power / this.max_power) * game.bar_width; },
    missiles: function () { return (this.missiles / this.max_missiles) * game.bar_width; },
    fuel: function () { return (this.fuel / this.max_fuel) * game.bar_width },
    warp: function () { return (this.warp / 100 * game.bar_width); },
    bar_width: function () { return (game.bar_width) },
    is_dead: function () { return (this.is_dead ? 'dead' : '') }
  };
  
  $.extend(this, options);
  $.extend(this, this.shipTypes[options.type]);
  
  for (var x = 0; x < this.shipTypes[this.type].section_list.length; x++) {
    this.addSection(this.shipTypes[this.type].section_list[x]);
  }
}

Ship.prototype.addCrew = function (fng) {
  this.crew.push(fng);
  
  //game.message(this.name+' +crew: '+options.name);
  game.refreshScreen();
};

Ship.prototype.addSection = function (options) {
  options.ship = this;
  
  this.sections.push(new ShipSection(options));
  //game.message(this.name+' +section: '+options.name);
  
  game.refreshScreen();
};

Ship.prototype.addWeapon = function (options) {
  this.weapons.push(new Weapon(options));
  game.refreshScreen();
};

Ship.prototype.getSection = function(type) {
  return $.grep(this.sections, function(e){ return e.type == 'shield'; })[0];
}

Ship.prototype.hit = function (aggressor, weapon_index) {
  
  var weapon = aggressor.weapons[weapon_index];
  
  if (weapon.ammo_type == 'laser') {
    if (aggressor.power <= 1) {
      game.message('Not enough power to use laser!');
      game.refreshScreen();
      return false;
    } else {
      aggressor.power -= weapon.power_used;
    }
  }

  if (!weapon.fire()) {
    console.log(weapon);
    if (weapon.ammo > 0) {
      game.message('Not enough ammo! ' + weapon.name + ' takes ' + weapon.rounds_per_shot + ' ammo per shot.');
    } else {
      game.message('No ammo!');
    }
    game.refreshScreen();
    return false;
  }

  game.message('------------------------------------------');
  game.message('<span class="' + aggressor.affiliation + '">' + aggressor + '</span> fires ' + aggressor.weapons[weapon_index] + ' at <span class="'+this.affiliation+'">' + this + '</span>!');
  
  if (weapon.ammo_type == 'missile' && aggressor.missiles < 1) {
  
  }

  //weapon.ammo -= weapon.rounds_per_shot;
  
  // Do some evade stuff
  var engine = this.getSection('engine');
  var bridge = this.getSection('bridge');  
  var evade_chance = 0.5;
  
  // Do some shield stuff
  if (weapon.blocked_by.shield) {
    var shield = this.getSection('shield');
    if (shield) {
      //game.message('Ship has a shield with '+ shield.hp +' hp');
      var shield_factor = (weapon.hull_damage / 100) * shield.hp;
      game.message('Shield: '+shield.hp + 'hp, factor: '+shield_factor); 
    } else {
      var shield_factor = 0;
      //game.message('No shield.');
    }
    this.hull -= weapon.hull_damage;
    if (this.hull < 0) { 
      this.hull = 0; 
      this.die();
      return false;
    }
  }
  
  // Hit a crew member
  var random_crew = this.crew[game.dice(game.my_ship.crew.length)];
  var damage_done = random_crew.hit(weapon.crew_damage);
  
  // Hit a section
  this.sections[game.dice(this.sections.length)].hit(weapon.section_damage);
  
  game.refreshScreen();
};

Ship.prototype.die = function () {
  this.is_dead = true;
  if (game.my_ship.is_dead) {
    game.end('Your ship exploded.');
  }
};

Ship.prototype.toHtml = function () {
  return Mustache.render(this.tmpl, this);
};

Ship.prototype.toString = function () {
  return this.name;
};

Ship.prototype.warp = function () {
  var move_x = Rand.getInt(-10,10);
  var move_y = Rand.getInt(-10,10);
  
  this.x = this.x + move_x;
  this.y = this.y + move_x;
  
  this.shape.move(move_x, move_y);
  this.label.move(move_x, move_y);
  game.stage.draw();
  game.message(this.name + ' warps: ' + move_x + ', ' + move_y);
};

Ship.prototype.tick = function () {
  for (var x = 0; x < this.crew.length; x++) {
    this.crew[x].tick();
  }
};
