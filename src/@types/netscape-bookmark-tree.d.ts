declare module 'netscape-bookmark-tree' {
  // Define the context type used in the options.each function
  interface NodeContext {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentPath: any[];
    isLeaf: boolean;
    index: number;
  }

  // Define the type for a Bookmark (used in the tree structure)
  interface BookmarkNode {
    name: string;
    index: number;
    id: string;
    pid?: string;
    href?: string;
    children?: BookmarkNode[];
  }

  // Define the type for the parse options object
  interface ParseOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    each?: (node: any, context: NodeContext) => any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChildren?: (node: any, children: any[]) => void;
  }

  // Define the type for the stringify options object
  interface StringifyOptions {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    each?: (node: BookmarkNode, context: NodeContext) => any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setChildren?: (node: any, children: any[]) => void;
  }

  // Define the type for the defaultOptions object
  interface DefaultOptions {
    parse: ParseOptions;
    stringify: StringifyOptions;
  }

  // Define the type for the parse function
  /**
   * Convert a bookmark string to a tree structure
   * @param {String} string - bookmark file string
   * @param {ParseOptions} options - default: `defaultOptions.parse`
   * @returns {BookmarkNode[]} tree
   */
  function parse(
    string: string,
    options?: Partial<DefaultOptions['parse']>
  ): BookmarkNode[];

  // Define the type for the stringify function
  /**
   * Convert a bookmark tree to a string
   * @param {BookmarkNode[]} tree - bookmark tree
   * @param {StringifyOptions} options - default: `defaultOptions.stringify`
   * @returns {string[]} bookmark strings
   */
  function stringify(
    tree: BookmarkNode[],
    options?: Partial<DefaultOptions['stringify']>
  ): string[];

  export { parse, stringify, DefaultOptions };
}
