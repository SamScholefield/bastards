
Bastards, Thieves and Pirates
=============================

**A single-player browser-based space strategy game.**

It's space combat through a scanner (darkly).

Fire your lasers, shoot your photo torpedoes, send all power to the shields, keep an eye on the numbers, watch the hull damage.

Play a part-finished almost-game at: http://deviouschimp.co.uk/misc/btp/

![Screenshot](http://deviouschimp.co.uk/misc/btp/screenshot.png)

Your ship
---------

It's called The Heavy Hawk. It can warp a large distance when the warp drive is charged. It has a *hull* which can be damaged. If hull reaches 0 - game over, man. It has different sections which can be damaged individually. These sections influence how well your ship dodges, shoots, charges etc.

Your crew
---------

** Names are from donjon.bin.sh/scifi/name/#terran_male and are subject to change any time I can think of better ones. **

### Jase Barner ###

Fearless captain and pilot. Knows his shit. Keep this guy alive to keep dodging incoming weapons, warping to safety

### Harry Raige ###

Weapon specialist with anger issues.

### Patry Gibbon ###

Grease monkey engine expert.

Ship Sections
-------------

### Shield ###



### Engine ###



### O2 ###



### Medic ###



### Weapons ###



### Bridge ###

Enemy Ships
-----------

In this sector of space there are four ships. Yours is one of them, the others are filled with, respectively, bastards, thieves and pirates.


### Bastards ###

They want to hurt you.


### Thieves ###

They just want your stuff and they'll try to be sneaky about it.


### Pirates ###

Want your stuff and they won't ask nicely.



Parameters
==========

    Name          Notes
    ---------------------------------------------
    Missiles      This just gradually goes down.
    Lasers        These are powered by power.
    
    Warp          Cooldown time after warping.
    
    READOUTS
    hull          While 0, oxygen drops.
    oxygen        While 0, crew health drops.
    power         Alters effects of lasers, shields & engines.
    fuel          While 0, cannot warp.
    
    SECTIONS
    shield        Damage is limited in some relation to this amount.
    engine        Must be above 0 to warp.
    O2            While above 0, oxygen regenerates in relation to this value.
    medic         While above 0, crew health regenerates in relation to this value.
    weapons       While 0, cannot shoot. While higher number means more accurate weapons.
    bridge        While 0, cannot warp.
    
    crew          When all crew health hits 0 - game over.
