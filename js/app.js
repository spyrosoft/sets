$(document).foundation();

$('#begin').on('click', begin_game);

var deck;
var deck_properties = {
  shape: [
    'diamond',
    'oval',
    'squiggle'
  ],
  color: [
    'teal',
    'pink',
    'orange'
  ],
  fill: [
    'empty',
    'partial',
    'full'
  ],
  number: [
    1,
    2,
    3
  ]
}
var discard;

function begin_game() {
	$('.intro').hide();
  build_deck();
  deck = shuffle(deck);
}

function build_deck() {
  deck = [];
  discard = [];
  build_deck_shape();
}

function build_deck_shape() {
  permute_shapes();
}

function permute_shapes() {
  for (var i = 0; i < deck_properties.shape.length; i++) {
    permute_colors(deck_properties.shape[i]);
  }
}

function permute_colors(shape) {
  for (var i = 0; i < deck_properties.color.length; i++) {
    permute_fill(shape, deck_properties.color[i]);
  }
}

function permute_fill(shape, color) {
  for (var i = 0; i < deck_properties.fill.length; i++) {
    permute_number(shape, color, deck_properties.fill[i]);
  }
}

function permute_number(shape, color, fill) {
  for (var i = 0; i < deck_properties.number.length; i++) {
    deck.push(
      {
        shape: shape,
        color: color,
        fill: fill,
        number: deck_properties.number[i]
      }
    );
  }
}

function demo_deck() {
  for (var i = 0; i < 12; i++) {
    var card = deck.pop();
    discard.push(card);
    var new_card = $('.card-template').clone(true);
    new_card.removeClass('display-none card-template');
    create_card(card, $(new_card).find('.card'));
    new_card.attr('id', 'card-' + i);
    new_card.on('click', card_clicked);
    $('.gameboard').append(new_card);
  }
}

function create_card(card, element) {
  for (var number = 0; number < card.number; number++) {
    element.append(
      $(
        '<img src="images/'
        + card.shape
        + '-'
        + card.color
        + '-'
        + card.fill
        + '.svg">'
      )
    );
  }
}

function card_clicked(event) {
  var card = $(this);
  if (card.hasClass('selected')) {
    card.removeClass('selected');
  } else {
    card.addClass('selected');
  }
  var selected_cards = $('.card-container.selected');
  if (selected_cards.length >= 3) {
    if (valid_set()) {
      swap_card(selected_cards[0]);
      swap_card(selected_cards[1]);
      swap_card(selected_cards[2]);
      selected_cards.removeClass('selected');
    }
  }
}

function valid_set() {
  return true;
  
}

function swap_card(card_element) {
  $(card_element).find('img').remove();
  var new_card = deck.pop();
  create_card(new_card, $(card_element).find('.card'));
}

function shuffle(array) {
  var current_index = array.length, temporary_value, random_index;
  while (0 !== current_index) {
    random_index = Math.floor(Math.random() * current_index);
    current_index -= 1;
    temporary_value = array[current_index];
    array[current_index] = array[random_index];
    array[random_index] = temporary_value;
  }
  return array;
}

begin_game();
demo_deck();
