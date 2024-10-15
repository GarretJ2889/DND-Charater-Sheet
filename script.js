// Array to hold all saved characters
let characterList = [];

// Select elements related to saving, loading, and deleting characters
const saveCharacterButton = document.getElementById('saveCharacter');
const loadSelectedCharacterButton = document.getElementById('loadSelectedCharacter');
const deleteCharacterButton = document.getElementById('deleteCharacter');
const characterDropdown = document.getElementById('characterList');

// Select elements for inventory management
const newItemInput = document.getElementById('newItem');
const itemDetailsInput = document.getElementById('itemDetails');
const addItemButton = document.getElementById('addItem');
const inventoryList = document.getElementById('inventoryList');
const displayInventorySheet = document.getElementById('displayInventorySheet');

// Select other input elements
const charNameInput = document.getElementById('charName');
const charClassSelect = document.getElementById('charClass');
const charRaceSelect = document.getElementById('charRace');
const characterLevelInput = document.getElementById('characterLevel');
const proficiencyBonusDisplay = document.getElementById('proficiencyBonus');
const hpInput = document.getElementById('hp');
const acInput = document.getElementById('ac');
const initiativeInput = document.getElementById('initiative');

// Stat input elements
const strengthInput = document.getElementById('strength');
const dexterityInput = document.getElementById('dexterity');
const constitutionInput = document.getElementById('constitution');
const intelligenceInput = document.getElementById('intelligence');
const wisdomInput = document.getElementById('wisdom');
const charismaInput = document.getElementById('charisma');

// Character sheet view elements
const displayNameSheet = document.getElementById('displayNameSheet');
const displayClassSheet = document.getElementById('displayClassSheet');
const displayRaceSheet = document.getElementById('displayRaceSheet');
const displayLevelSheet = document.getElementById('displayLevelSheet');
const displayProficiencyBonusSheet = document.getElementById('displayProficiencyBonusSheet');
const characterHpSheet = document.getElementById('characterHpSheet');
const displayAcSheet = document.getElementById('displayAcSheet');
const displayInitiativeSheet = document.getElementById('displayInitiativeSheet');

// Select elements for the toggle button and views
const toggleViewButton = document.getElementById('toggleViewButton');
const editView = document.getElementById('editView');
const characterSheetView = document.getElementById('characterSheetView');

// Toggle between edit view and character sheet view
toggleViewButton.addEventListener('click', () => {
  if (editView.style.display === 'none') {
    editView.style.display = 'block';
    characterSheetView.style.display = 'none';
    toggleViewButton.textContent = 'Switch to Character Sheet View';
  } else {
    populateCharacterSheetView(); // Populate the character sheet view with data
    editView.style.display = 'none';
    characterSheetView.style.display = 'block';
    toggleViewButton.textContent = 'Switch to Edit View';
  }
});


// List elements for abilities, feats, actions, and notes
const abilitiesList = document.getElementById('abilitiesList');
const featsList = document.getElementById('featsList');
const actionsList = document.getElementById('actionsList');
const characterNotesInput = document.getElementById('characterNotes');
const displayAbilitiesSheet = document.getElementById('displayAbilitiesSheet');
const displayFeatsSheet = document.getElementById('displayFeatsSheet');
const displayActionsSheet = document.getElementById('displayActionsSheet');
const displayNotesSheet = document.getElementById('displayNotesSheet');

// Helper function to calculate stat modifier
function calculateModifier(stat) {
  return Math.floor((stat - 10) / 2);
}

// Utility function to format modifiers
function formatModifier(modifier) {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

// Helper function to get all saved characters from localStorage
function getAllCharacters() {
  const savedCharacters = localStorage.getItem('dndCharacters');
  return savedCharacters ? JSON.parse(savedCharacters) : [];
}

// Helper function to save the character list to localStorage
function saveAllCharacters(characters) {
  localStorage.setItem('dndCharacters', JSON.stringify(characters));
}

// Function to update the character dropdown with the latest character list
function updateCharacterDropdown() {
  characterDropdown.innerHTML = '<option value="">-- Select a character --</option>';
  characterList.forEach((character, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = character.name || `Character ${index + 1}`;
    characterDropdown.appendChild(option);
  });
}

// Function to add a new item to the inventory list
function addItem() {
  const itemName = newItemInput.value.trim();
  const itemDetails = itemDetailsInput.value.trim();

  if (!itemName) return alert('Item name is required.');

  const li = document.createElement('li');
  li.textContent = `${itemName} (${itemDetails})`;
  li.addEventListener('click', () => li.remove());
  inventoryList.appendChild(li);

  newItemInput.value = '';
  itemDetailsInput.value = '';
}

// Sync inventory from the edit view to the character sheet view
function syncInventory() {
  displayInventorySheet.innerHTML = inventoryList.innerHTML;
}

// Populate the character sheet view with current data
function populateCharacterSheetView() {
  displayNameSheet.textContent = charNameInput.value || 'Character Name';
  displayClassSheet.textContent = charClassSelect.value;
  displayRaceSheet.textContent = charRaceSelect.value;
  displayLevelSheet.textContent = characterLevelInput.value;
  displayProficiencyBonusSheet.textContent = proficiencyBonusDisplay.textContent;

  characterHpSheet.value = hpInput.value;
  displayAcSheet.textContent = acInput.value;

  const initiativeValue = initiativeInput.value || calculateModifier(dexterityInput.value);
  displayInitiativeSheet.textContent = formatModifier(initiativeValue);

  displayStrength.textContent = `${strengthInput.value} (${formatModifier(calculateModifier(strengthInput.value))})`;
  displayDexterity.textContent = `${dexterityInput.value} (${formatModifier(calculateModifier(dexterityInput.value))})`;
  displayConstitution.textContent = `${constitutionInput.value} (${formatModifier(calculateModifier(constitutionInput.value))})`;
  displayIntelligence.textContent = `${intelligenceInput.value} (${formatModifier(calculateModifier(intelligenceInput.value))})`;
  displayWisdom.textContent = `${wisdomInput.value} (${formatModifier(calculateModifier(wisdomInput.value))})`;
  displayCharisma.textContent = `${charismaInput.value} (${formatModifier(calculateModifier(charismaInput.value))})`;

  displayAbilitiesSheet.innerHTML = abilitiesList.innerHTML;
  displayFeatsSheet.innerHTML = featsList.innerHTML;
  displayActionsSheet.innerHTML = actionsList.innerHTML;
  displayNotesSheet.textContent = characterNotesInput.value || '-';

  syncInventory();
}

// Save the current character to the list and localStorage
function saveCharacter() {
  const newCharacter = {
    name: charNameInput.value,
    class: charClassSelect.value,
    race: charRaceSelect.value,
    level: characterLevelInput.value,
    hp: hpInput.value,
    ac: acInput.value,
    initiative: initiativeInput.value || calculateModifier(dexterityInput.value),
    stats: {
      strength: strengthInput.value,
      dexterity: dexterityInput.value,
      constitution: constitutionInput.value,
      intelligence: intelligenceInput.value,
      wisdom: wisdomInput.value,
      charisma: charismaInput.value,
    },
    abilities: Array.from(abilitiesList.children).map(li => li.textContent),
    feats: Array.from(featsList.children).map(li => li.textContent),
    actions: Array.from(actionsList.children).map(li => li.textContent),
    inventory: Array.from(inventoryList.children).map(li => li.textContent),
    notes: characterNotesInput.value,
  };

  characterList.push(newCharacter);
  saveAllCharacters(characterList);
  updateCharacterDropdown();
  alert('Character saved successfully!');
}

// Load the selected character into the edit view
function loadSelectedCharacter() {
  const selectedIndex = characterDropdown.value;
  if (selectedIndex === "") return alert('Please select a character to load.');

  const character = characterList[selectedIndex];

  charNameInput.value = character.name;
  charClassSelect.value = character.class;
  charRaceSelect.value = character.race;
  characterLevelInput.value = character.level;
  hpInput.value = character.hp;
  acInput.value = character.ac;
  initiativeInput.value = character.initiative;

  strengthInput.value = character.stats.strength;
  dexterityInput.value = character.stats.dexterity;
  constitutionInput.value = character.stats.constitution;
  intelligenceInput.value = character.stats.intelligence;
  wisdomInput.value = character.stats.wisdom;
  charismaInput.value = character.stats.charisma;

  abilitiesList.innerHTML = '';
  character.abilities.forEach(ability => {
    const li = document.createElement('li');
    li.textContent = ability;
    abilitiesList.appendChild(li);
  });

  featsList.innerHTML = '';
  character.feats.forEach(feat => {
    const li = document.createElement('li');
    li.textContent = feat;
    featsList.appendChild(li);
  });

  actionsList.innerHTML = '';
  character.actions.forEach(action => {
    const li = document.createElement('li');
    li.textContent = action;
    actionsList.appendChild(li);
  });

  inventoryList.innerHTML = '';
  character.inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    inventoryList.appendChild(li);
  });

  characterNotesInput.value = character.notes;
  alert('Character loaded successfully!');
}

// Delete the selected character from the list and localStorage
function deleteSelectedCharacter() {
  const selectedIndex = characterDropdown.value;
  if (selectedIndex === "") return alert('Please select a character to delete.');

  characterList.splice(selectedIndex, 1);
  saveAllCharacters(characterList);
  updateCharacterDropdown();
  alert('Character deleted successfully!');
}

// Event listeners
addItemButton.addEventListener('click', addItem);
saveCharacterButton.addEventListener('click', saveCharacter);
loadSelectedCharacterButton.addEventListener('click', loadSelectedCharacter);
deleteCharacterButton.addEventListener('click', deleteSelectedCharacter);

// Initialize the character list and dropdown on page load
window.addEventListener('load', () => {
  characterList = getAllCharacters();
  updateCharacterDropdown();
});
