/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {userID: 1, name: 'Excalibur', description: 'Excalibur is the mythical sword of King Arthur that may possess magical powers or be associated with the rightful sovereignty of Britain.', quantity: 4},
    {userID: 1, name: 'Dragonslayer Spear', description: "Cross spear born from the soul of Ornstein, a Dragonslayer guarding Anor Londo cathedral. Inflicts lightning damage; effective against dragons. Two-handed thrust relies on cross and buries deep within a dragon's hide, and sends human foes flying.", quantity: 2},
    {userID: 1, name: "Ornstein's Set", description: 'Armor of the dragonslayer Ornstein, who guards the cathedral in the forsaken city of Anor Londo. Ornstein is believed to be the captain of the Four Knights. His golden lion helm is imbued with the power of lightning and should provide good protection against it.', quantity: 1},
    {userID: 2, name: 'Sunlight Straight Sword', description: "This standard longsword, belonging to Solaire of Astora, is of high quality, is well-forged, and has been kept in good repair. Easy to use and dependable, but unlikely to live up to its grandiose name.", quantity: 1},
    {userID: 2, name: 'Sunlight Talisman', description: "Medium for casting miracles of the Gods. The talisman of Solaire of Astora, the Knight of Sunlight, is decorated with a holy symbol, illustrated by Solaire himself. This talisman is a projection of Solaire's upstanding, unwavering faith.", quantity: 1},
    {userID: 2, name: 'Sunlight Shield', description: "Shield of Solaire of Astora, Knight of Sunlight. Decorated with a holy symbol, but Solaire illustrated it himself, and it has no divine powers of its own. As it turns out, Solaire's incredible prowess is a product of his own training, and nothing else.", quantity: 1},
    {userID: 2, name: 'Iron and Sun Armor', description: "The Armor of Solaire of Astora, Knight of Sunlight, It is Armor of the finest quality and bears the large holy symbol of the sun painted by Solaire himself, This armor of high quality but lacks any particular power", quantity: 1},
    {userID: 3, name: 'Shard of Alexander', description: "Shard of the late Alexander, a shattered warrior jar.", quantity: 10},
    {userID: 3, name: "Alexander's Innards", description: "A keepsake of the warrior jar Alexander. Found at the core of the dead flesh that once filled the great jar. The jars contain dregs inherited from those who came before. Thus are warriors passed from jar to jar, carrying dreams of greatness.", quantity: 1},
    {userID: 3, name: 'HEART', description: "Alexander gained the heart of all through his journey's and is cherished by too many to count", quantity: 999999999}
  ]);
};
