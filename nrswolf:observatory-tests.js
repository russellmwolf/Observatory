Tinytest.add('Observatory', function(test) {
  Pokemon = new Meteor.Collection('Pokemon');

  var pikachuId = Pokemon.insert({
    name: 'Pikachu',
    type: 'Electriciy'
  });

  var charizardId = Pokemon.insert({
    name: 'Charizard',
    type: 'Fire',
    moves: [
      'Fireball',
      'Firebreath'
    ]
  });

  var actualHeaders = Observatory.buildHeaders(Pokemon.find());
  var expectedHeaders = ['name', 'type', '_id', 'moves.0', 'moves.1'];

  test.equal(actualHeaders, expectedHeaders);

  var actualOutput = Observatory.buildOutput(Pokemon.find());
  var expectedOutput = [
    actualHeaders,
    ['Pikachu', 'Electriciy', pikachuId, null, null],
    ['Charizard', 'Fire', charizardId, 'Fireball', 'Firebreath']
  ];

  test.equal(actualOutput, expectedOutput);
});
