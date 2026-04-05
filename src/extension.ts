import * as vscode from 'vscode';

/**
 * Git-Probe Extension Entry Point
 * 
 * AI-augmented MTG collection manager with deck building,
 * Scryfall integration, and collection tracking.
 */

export function activate(context: vscode.ExtensionContext): void {
  console.log('Git-Probe extension is now active!');

  // Register commands
  const searchCardsCommand = vscode.commands.registerCommand(
    'git-probe.searchCards',
    () => {
      vscode.window.showInformationMessage('Search Cards command triggered!');
    }
  );

  const refreshCollectionCommand = vscode.commands.registerCommand(
    'git-probe.refreshCollection',
    () => {
      vscode.window.showInformationMessage('Collection refresh triggered!');
    }
  );

  // Add subscriptions
  context.subscriptions.push(searchCardsCommand, refreshCollectionCommand);

  // Log activation
  vscode.window.showInformationMessage(
    'Git-Probe: MTG collection manager is ready!'
  );
}

export function deactivate(): void {
  console.log('Git-Probe extension is now deactivated');
}
