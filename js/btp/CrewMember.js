/**
 * A crew member aboard a ship.
 *
 * Natural habitat: ship.crew
 *
 * Copyright 2013 Mr Chimp - deviouschimp.co.uk.
 * Released with a foolish disregard to licenses.
**/
function CrewMember(options) {
  this.name =           'Unknown Soldier',
  this.race =           'human',
  this.repair_factor =  1,
  this.walk_speed =     1,
  this.color =          '#900',
  this.max_hp =         100,
  this.hp =             100,
  this.is_alive =       true;
  this.display = {
    hp: function () { return (this.hp / this.max_hp) * game.bar_width }
  };
  
  $.extend(this, options);
};

CrewMember.prototype.hit = function (damage) {
  if (!this.is_alive) { 
    game.message(this.name+' is already dead.');
    return false;
  }
  
  this.hp -= damage;
  
  game.refreshScreen();
  game.message(this.name+' hit: -' + damage + ' hp');
  
  if (this.hp < 1) {
    this.hp = 0;
    this.kill(); 
  }
  
  return damage;
};

CrewMember.prototype.kill = function () {
  if (!this.is_alive) { 
    game.message(this.name+' is already dead.');
    return false;
  }
  
  this.is_alive = false;
  
  game.message(this.name+' died!');
  game.refreshScreen();
};

CrewMember.prototype.toString = function () {
  return this.name
};