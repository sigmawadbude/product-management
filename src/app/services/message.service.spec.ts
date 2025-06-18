import { TestBed } from '@angular/core/testing';
import { MessageService } from '../services/message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    // Configure the testing module.
    // In this simple case, we don't need to import any other modules
    // because MessageService doesn't have any dependencies.
    TestBed.configureTestingModule({
      providers: [MessageService], // Make the service available for injection
    });

    // Get an instance of the service from the TestBed.
    // This ensures we're testing the instance provided by Angular's DI.
    service = TestBed.inject(MessageService);
  });

  // Test case: Check if the service is created successfully.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Expect the service instance to exist
  });

  // Test case: Check if the messages array is initially empty.
  it('should have an empty messages array initially', () => {
    expect(service.messages.length).toBe(0); // Expect the length to be 0
    expect(service.messages).toEqual([]); // Expect it to be an empty array
  });

  // Test case: Verify that addMessage adds a message correctly.
  it('should add a message with a timestamp', () => {
    const testMessage = 'Test message 1';
    service.addMessage(testMessage);

    // Expect exactly one message to be present.
    expect(service.messages.length).toBe(1);

    const addedMessage = service.messages[0];

    // Expect the added message to contain the original message text.
    expect(addedMessage).toContain(testMessage);

    // Expect the added message to contain "at" followed by a date/time string.
    // We're not testing the exact date, just its presence and format.
    expect(addedMessage).toMatch(
      /Test message 1 at \d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2} (AM|PM)/
    );
    // Note: The regex for date/time depends on the locale. This is a common US format.
    // If your locale is different, you might need to adjust the regex or mock Date.toLocaleString.
  });

  // Test case: Verify that messages are added in LIFO (Last-In, First-Out) order
  // because unshift() is used. The newest message should be at the beginning.
  it('should add new messages to the beginning of the array (LIFO)', () => {
    const message1 = 'First message';
    const message2 = 'Second message';
    const message3 = 'Third message';

    service.addMessage(message1);
    service.addMessage(message2);
    service.addMessage(message3);

    // After adding three messages, the length should be 3.
    expect(service.messages.length).toBe(3);

    // The last added message (Third message) should be at index 0.
    expect(service.messages[0]).toContain(message3);
    // The second to last added message (Second message) should be at index 1.
    expect(service.messages[1]).toContain(message2);
    // The first added message (First message) should be at index 2.
    expect(service.messages[2]).toContain(message1);
  });
});
