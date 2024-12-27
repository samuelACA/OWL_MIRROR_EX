Code strongly made with chat-gpt 4° mini

# Owlbear Rodeo Token Mirror Extension

This extension adds a token mirroring feature to [Owlbear Rodeo](https://www.owlbear.rodeo), allowing game masters to link tokens so they move in synchronized patterns. This feature is ideal for managing groups of entities that share the same movement logic, such as linked tokens or formations.

## Features

- **Token Mirroring**: Connect multiple tokens to move in synchronized patterns.
- **Vector Configuration**: Allows individual control of movement vectors for each token in the group.
- **Multi-Group Support**: A token can only belong to one group, but multiple groups can exist in the same scene.
- **Temporary Links**: Links between tokens are session-based and will not persist across sessions.
- **Game Master Control**: Only the game master can configure token mirroring and see group highlights.
- **Visual Effects**: Tokens in the same group are highlighted in blue when one is selected, visible only to the game master.

## How It Works

1. **Setup**: Game masters can configure token mirroring via the token menu by right-clicking a token and selecting "Mirror."
2. **Linking Tokens**: After selecting "Mirror," click another token to link it. A configuration interface will appear for adjusting movement vectors.
3. **Breaking Links**: To unlink tokens, use the "Break Mirror" option in the token menu.
4. **Movement Synchronization**: Moving any token in a group automatically updates the positions of all linked tokens based on their configured vectors.

## Installation

1. Clone or download this repository.
2. Open the `manifest.json` file and ensure all paths are correct for your local environment.
3. Import the extension into your browser's developer tools or Owlbear Rodeo as specified in its documentation.

## Usage

1. Open Owlbear Rodeo and load the extension.
2. Right-click on a token to open the token menu.
3. Select "Mirror" and choose another token to link.
4. Adjust the movement vectors in the configuration interface.
5. Move any token in the group to see the synchronized movement.

## Development

This extension was designed to be modular and extendable. The project is organized as follows:


## Contributing

Contributions are welcome! Please ensure that any changes you make retain the original functionality of the extension. Feel free to submit issues or pull requests for improvements.

## License

This project is provided as-is, with no guarantee of functionality. You are free to modify and distribute this code, but please retain the original features and functionality while adding your changes.

---

Happy gaming!
